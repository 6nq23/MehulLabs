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
      <div className="shell film-layout">
        <div className="film-intro">
          <span className="section-label">A short brand introduction</span>
          <h3 id="film-title">More orders.<br /><span className="muted-heading">Less busywork.</span></h3>
          <p>The idea behind Mehul Labs, in ten seconds. This film introduces our approach; it isn&apos;t a demonstration of the product.</p>
          <span className="film-caption">Brand film · 10 seconds · Play when you like</span>
        </div>
        <div className="film-media"><div className="film-frame">
          <video ref={videoRef} src="/story-video.mp4" poster="/story-poster.webp" playsInline controls preload="none" data-playing={started ? '' : undefined} aria-label="Mehul Labs brand film" aria-describedby="film-description" onPlay={() => setStarted(true)} onPause={() => setStarted(false)} onEnded={() => setStarted(false)} onError={() => setError('The film is unavailable right now. Please try the direct link below.')}>
            Your browser does not support this video. <a href="/story-video.mp4">Watch the brand film.</a>
          </video>
          {!started && <button type="button" className="film-play" onClick={playFilm} aria-label="Play the ten-second Mehul Labs brand film"><span className="film-play-circle" aria-hidden="true">▶</span><span>Watch the film <small>00:10</small></span></button>}
          {!started && <span className="film-corner" aria-hidden="true">A little less chaos.<br />A little more clarity.</span>}
        </div>
        <details className="film-description"><summary>Film description</summary><p id="film-description">An animated business owner juggles the moving parts of a growing business. This is a brand introduction, not a product demonstration.</p></details>
        {error && <p className="film-error" role="status">{error} <a href="/story-video.mp4">Open the film</a></p>}
        </div>
      </div>
    </section>
  );
}
