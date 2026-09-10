import Image from 'next/image';
import { hasCompleteOrderEvidence, ownedBrands, ownershipDisclosure, type EvidenceMedia } from '@/data/experience';

function EvidenceFigure({ media }: { media: EvidenceMedia }) {
  return (
    <figure className="evidence-figure">
      {media.kind === 'image' ? (
        <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 899px) 90vw, 40vw" />
      ) : (
        <>
          <video src={media.src} poster={media.poster} controls playsInline preload="none" aria-label={media.caption}>
            <track kind="captions" src={media.captionsSrc} srcLang="en" label="English" default />
            Your browser cannot play this recording. <a href={media.src}>Open the workflow recording.</a>
          </video>
          <details><summary>Read the workflow transcript</summary><p>{media.transcript}</p></details>
        </>
      )}
      <figcaption>{media.caption}</figcaption>
    </figure>
  );
}

export function OperatingExperience() {
  return (
    <aside className="operating-experience" aria-labelledby="experience-title">
      <p className="experience-label">Our operating experience</p>
      <h4 id="experience-title">We use it in<br />our own businesses.</h4>
      <ul className="owned-brand-list">
        {ownedBrands.map(brand => (
          <li key={brand.id}>
            <span className="brand-category">{brand.category}</span>
            <h5>{brand.name}</h5>
            <p>{brand.context}</p>
            {hasCompleteOrderEvidence(brand.approvedOrderEvidence) && (
              <div className="order-evidence">
                <p><strong>{brand.approvedOrderEvidence.count.toLocaleString('en-IN')}</strong> {brand.approvedOrderEvidence.measure} · {brand.approvedOrderEvidence.basis}</p>
                <p>{brand.approvedOrderEvidence.period}</p>
                <p>Source: {brand.approvedOrderEvidence.source}</p>
              </div>
            )}
            {brand.approvedMedia.map(media => <EvidenceFigure key={media.id} media={media} />)}
          </li>
        ))}
      </ul>
      <p className="ownership-disclosure">{ownershipDisclosure}</p>
    </aside>
  );
}
