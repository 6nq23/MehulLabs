'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface Options {
  count: number;
  /** Must be referentially stable — memoize in the caller. */
  srcFor: (index: number) => string;
  /** Parallel in-flight image requests. */
  concurrency?: number;
  /**
   * Hard ceiling on how many decoded frames are held in memory at once.
   * A full 872-frame set at 1600px would otherwise pin ~5 GB of bitmaps;
   * with an LRU window we stay flat (~1.5 GB) regardless of sequence length.
   * Frames outside the window are re-fetched from the HTTP cache (immutable,
   * already downloaded) and re-decoded on demand — cheap and rare, because
   * scrubbing is highly local.
   */
  maxDecoded?: number;
  /** Skip loading entirely (e.g. before the frame set has been chosen). */
  enabled?: boolean;
}

export interface FrameSequence {
  /** Nearest decoded frame at or around `index`, or null if nothing loaded yet. */
  getFrame: (index: number) => HTMLImageElement | null;
  /** 0–1 across the whole sequence (fraction ever fetched). */
  progress: number;
  /** True once enough coarse keyframes exist to scrub without gaps. */
  ready: boolean;
}

/**
 * Loads an image sequence coarse-to-fine into a bounded LRU cache.
 *
 * Ordering: rather than 0,1,2,3… (which leaves the back half of the timeline
 * blank for seconds) we sweep at stride 16, then 8, 4, 2, 1. After ~30 requests
 * every scrub position already has a frame near it, and the sequence visibly
 * sharpens as the finer passes land.
 *
 * Memory: the decoded cache is capped. The currently-viewed frame is touched
 * every render tick, so it (and its neighbours) are always the most-recently
 * used and never evicted; only far-away frames get dropped.
 */
export function useFrameSequence({
  count,
  srcFor,
  concurrency = 6,
  maxDecoded = 260,
  enabled = true,
}: Options): FrameSequence {
  // Insertion/access order is the LRU order: re-inserting moves a key to newest.
  const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const everLoadedRef = useRef<Set<number>>(new Set());
  const inFlightRef = useRef<Set<number>>(new Set());
  const currentRef = useRef(0);
  // Set by the loader effect; lets getFrame re-request an evicted frame.
  const ensureRef = useRef<((index: number) => void) | null>(null);

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const cache = cacheRef.current;
    const everLoaded = everLoadedRef.current;
    const inFlight = inFlightRef.current;
    cache.clear();
    everLoaded.clear();
    inFlight.clear();

    // Protect a window around the viewport frame from eviction so a fast
    // scrub never drops the frames it is about to need.
    const protect = Math.min(72, Math.floor(maxDecoded / 4));

    const evict = () => {
      while (cache.size > maxDecoded) {
        let victim = -1;
        for (const key of cache.keys()) {
          // keys() yields oldest-first
          if (Math.abs(key - currentRef.current) > protect) {
            victim = key;
            break;
          }
        }
        if (victim === -1) {
          const first = cache.keys().next();
          if (first.done) break;
          victim = first.value;
        }
        cache.delete(victim);
      }
    };

    let cancelled = false;

    const load = (index: number, onSettle?: () => void) => {
      if (cancelled || cache.has(index) || inFlight.has(index)) {
        onSettle?.();
        return;
      }
      inFlight.add(index);

      const img = new Image();
      img.decoding = 'async';

      const settle = () => {
        inFlight.delete(index);
        onSettle?.();
      };

      img.onload = () => {
        if (cancelled) return;
        cache.set(index, img);
        evict();
        if (!everLoaded.has(index)) {
          everLoaded.add(index);
          setProgress(everLoaded.size / count);
        }
        settle();
      };
      img.onerror = settle;
      img.src = srcFor(index);
    };

    // On-demand loader for evicted frames the viewer scrolls back to.
    ensureRef.current = (index: number) => load(index);

    // Background coarse-to-fine sweep — warms the HTTP cache for the whole
    // timeline and drives readiness.
    const order: number[] = [];
    const queued = new Set<number>();
    for (const stride of [16, 8, 4, 2, 1]) {
      for (let i = 0; i < count; i += stride) {
        if (!queued.has(i)) {
          queued.add(i);
          order.push(i);
        }
      }
    }
    if (!queued.has(count - 1)) order.push(count - 1);

    let cursor = 0;
    let settled = 0;
    const total = order.length;
    const readyAt = Math.min(Math.ceil(count / 16), total);

    const pump = () => {
      if (cancelled || cursor >= total) return;
      const index = order[cursor++];
      const done = () => {
        settled += 1;
        if (settled >= readyAt) setReady(true);
        pump();
      };
      if (everLoaded.has(index)) {
        done();
      } else {
        load(index, done);
      }
    };

    for (let i = 0; i < concurrency; i += 1) pump();

    return () => {
      cancelled = true;
      ensureRef.current = null;
      cache.clear();
      everLoaded.clear();
      inFlight.clear();
    };
  }, [count, srcFor, concurrency, maxDecoded, enabled]);

  const getFrame = useCallback((index: number) => {
    const cache = cacheRef.current;
    const i = Math.max(0, Math.min(count - 1, Math.round(index)));
    currentRef.current = i;

    const exact = cache.get(i);
    if (exact) {
      // Touch → mark most-recently-used.
      cache.delete(i);
      cache.set(i, exact);
      return exact;
    }

    // Miss: kick a re-fetch (cheap; HTTP-cached) and serve the nearest we have.
    ensureRef.current?.(i);

    for (let d = 1; d < count; d += 1) {
      const before = cache.get(i - d);
      if (before) return before;
      const after = cache.get(i + d);
      if (after) return after;
    }
    return null;
  }, [count]);

  return { getFrame, progress, ready };
}
