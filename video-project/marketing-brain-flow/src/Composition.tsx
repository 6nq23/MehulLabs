import {AbsoluteFill, Composition, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const sources = [
  {label: 'Approved brand brief', y: 176, delay: 8, color: '#f4c64e', tint: '#fff7de', mark: '✦', path: 'M 372 203 C 455 203, 489 244, 590 278'},
  {label: 'Customer questions', y: 266, delay: 28, color: '#e791a2', tint: '#fff0f3', mark: '?', path: 'M 372 293 C 468 293, 502 292, 590 308'},
  {label: 'Past ad learnings', y: 356, delay: 48, color: '#8db9eb', tint: '#edf5ff', mark: '↗', path: 'M 372 383 C 458 383, 501 348, 590 338'},
  {label: 'Product focus', y: 446, delay: 68, color: '#9ac9ab', tint: '#eef9f0', mark: '◈', path: 'M 372 473 C 454 473, 490 389, 590 368'},
] as const;

const SourcePill: React.FC<(typeof sources)[number]> = ({label, y, delay, color, tint, mark}) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div name={label} style={{
      position: 'absolute', left: 62, top: y, width: 310, height: 54,
      display: 'flex', alignItems: 'center', gap: 12, padding: '0 15px', borderRadius: 27,
      backgroundColor: '#ffffff', boxShadow: '0 7px 22px #55504510, 0 1px 3px #5550450c',
      fontSize: 21, fontWeight: 650, letterSpacing: '-0.035em', color: '#242329',
      opacity: interpolate(frame, [delay, delay + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}),
      translate: interpolate(frame, [delay, delay + 16], ['-22px 0px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}),
    }}>
      <span style={{display: 'grid', placeItems: 'center', flex: '0 0 auto', width: 29, height: 29, borderRadius: 11, backgroundColor: tint, color, fontSize: 22, fontWeight: 850, lineHeight: 1}}>{mark}</span>
      <span>{label}</span>
    </Interactive.Div>
  );
};

const MarketingBrainFlow: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{fontFamily: 'Manrope, Arial, sans-serif', backgroundColor: '#f7f7f6', overflow: 'hidden'}}>
      <AbsoluteFill style={{opacity: interpolate(frame, [229, 239], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
        <div style={{position: 'absolute', left: 495, top: 148, width: 405, height: 405, borderRadius: '50%', background: 'radial-gradient(circle, #ffe9b6b8 0%, #ffe9b649 45%, #ffe9b600 72%)', opacity: interpolate(frame, [0, 105, 142, 190], [0.35, 0.48, 0.8, 0.48], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}} />

        <Interactive.Div name="Approved inputs label" style={{position: 'absolute', left: 64, top: 116, color: '#85827d', fontSize: 16, fontWeight: 800, letterSpacing: '0.11em'}}>
          APPROVED INPUTS
        </Interactive.Div>

        <svg width="960" height="820" viewBox="0 0 960 820" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          {sources.map(({label, path, delay}) => (
            <path key={label} d={path} pathLength={1} fill="none" stroke="#bbbdbb" strokeWidth="1.7" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={interpolate(frame, [delay + 8, delay + 36], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut})} />
          ))}
          <path d="M 700 445 L 700 552" pathLength={1} fill="none" stroke="#c0c1bc" strokeWidth="1.7" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={interpolate(frame, [148, 174], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut})} />
          <circle cx="700" cy="552" r="4" fill="#f5be36" opacity={interpolate(frame, [166, 177], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
        </svg>

        {sources.map((source) => <SourcePill key={source.label} {...source} />)}

        <Interactive.Div name="Marketing Brain label" style={{position: 'absolute', left: 603, top: 144, width: 194, textAlign: 'center', color: '#77736e', fontSize: 18, fontWeight: 750, letterSpacing: '-0.02em', opacity: interpolate(frame, [3, 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
          Marketing Brain
        </Interactive.Div>

        <Img name="Marketing Brain bee" src={staticFile('marketing-brain-bee.png')} style={{
          position: 'absolute', left: 560, top: 190, width: 280, height: 280,
          objectFit: 'contain', filter: 'drop-shadow(0 16px 20px #5c401b24)',
          opacity: interpolate(frame, [0, 17], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}),
          scale: interpolate(frame, [0, 24, 100, 135, 170, 239], [0.83, 1, 1, 1.055, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}),
          translate: '0px ' + Math.sin(frame / 16) * 4 + 'px',
        }} />

        <Interactive.Div name="Thinking bubble" style={{
          position: 'absolute', left: 810, top: 210, width: 89, height: 45, borderRadius: 24,
          backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 6px 20px #2e2b2714',
          opacity: interpolate(frame, [95, 107, 146, 160], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          translate: interpolate(frame, [95, 109], ['-8px 8px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}),
        }}>
          {[0, 1, 2].map((i) => <span key={i} style={{width: 7, height: 7, borderRadius: '50%', backgroundColor: '#4b4640', opacity: 0.25 + 0.75 * Math.max(0, Math.sin((frame - 100) * 0.21 - i * 0.65))}} />)}
        </Interactive.Div>

        <Interactive.Div name="Creative brief card" style={{
          position: 'absolute', left: 435, top: 563, width: 462, height: 203,
          boxSizing: 'border-box', padding: '27px 31px', borderRadius: 27,
          backgroundColor: '#fff', border: '1px solid #ebe9e5',
          boxShadow: '0 17px 34px #4d443117, 0 2px 5px #4d443108',
          opacity: interpolate(frame, [165, 185], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}),
          translate: interpolate(frame, [165, 189], ['0px 25px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}),
        }}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 11px', borderRadius: 15, backgroundColor: '#fff8e3', color: '#9d760f', fontSize: 14, fontWeight: 850, letterSpacing: '0.06em'}}><span style={{fontSize: 18, lineHeight: 1}}>✦</span> CREATIVE BRIEF</div>
          <div style={{marginTop: 12, color: '#18171a', fontSize: 36, fontWeight: 740, lineHeight: 1.11, letterSpacing: '-0.058em'}}>Ideas ready<br />for your review.</div>
          <div style={{marginTop: 10, color: '#7a7772', fontSize: 19, fontWeight: 570, letterSpacing: '-0.02em'}}>Content directions · ad angles · next steps</div>
        </Interactive.Div>

        <div style={{position: 'absolute', left: 62, bottom: 50, display: 'flex', gap: 7, alignItems: 'center', color: '#a5a19a', fontSize: 14, fontWeight: 740, letterSpacing: '0.08em'}}><span style={{display: 'inline-block', width: 7, height: 7, borderRadius: 7, backgroundColor: '#f3c64b'}} /> HUMAN-REVIEWED WORKFLOW</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const MyComposition = () => (
  <Composition id="MarketingBrainFlow" component={MarketingBrainFlow} durationInFrames={240} fps={30} width={960} height={820} />
);
