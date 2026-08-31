import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Maps `v` from [inMin,inMax] into [outMin,outMax], clamped at both ends. */
export const mapRange = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => clamp(((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin, Math.min(outMin, outMax), Math.max(outMin, outMax));
