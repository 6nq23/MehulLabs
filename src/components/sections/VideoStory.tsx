'use client';

import { useRef, useState } from 'react';

export function VideoStory() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState('');

  async function playFilm() {
    try {
      setStarted(true);
      await videoRef.current?.play();
      setError('');
    } catch {
      setStarted(false);
      setError('Playback could not start. You can open the film directly below.');
    }
  }

  return (
    <section id="story" className="film-section" aria-labelledby="film-title">
      <div className="shell">
        <div className="film-frame">
          <video ref={videoRef} src="/story-video.mp4" poster="/story-poster.webp" playsInline controls preload="none" aria-label="Mehul Labs brand film" aria-describedby="film-description" onPlay={() => setStarted(true)} onError={() => setError('The film is unavailable right now. Please try the direct link below.')}>
            Your browser does not support this video. <a href="/story-video.mp4">Watch the brand film.</a>
          </video>
          {!started && <button type="button" className="film-play" onClick={playFilm} aria-label="Play the ten-second Mehul Labs brand film"><span className="film-play-circle" aria-hidden="true">▶</span><span>Watch the film <small>00:10</small></span></button>}
          {!started && <span className="film-corner" aria-hidden="true">A little less chaos.<br />A little more clarity.</span>}
        </div>
        <div className="film-caption"><h2 id="film-title">Many moving parts. One way forward.</h2><span>The Mehul Labs approach / Brand film</span></div>
        <details className="film-description"><summary>About the film</summary><p id="film-description">An animated business owner moves from juggling research, search visibility, advertising, and operations to a more connected way of working. The film uses marketplace examples; Mehul Labs works across D2C stores and marketplaces.</p></details>
        {error && <p className="film-error" role="status">{error} <a href="/story-video.mp4">Open the film</a></p>}
      </div>
    </section>
  );
}
