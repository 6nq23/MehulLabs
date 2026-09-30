import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const inputs = [
  {label: 'Products + offers', mark: '◆', color: '#e9b342', y: 145, delay: 18},
  {label: 'Customer questions', mark: '?', color: '#e799a9', y: 247, delay: 32},
  {label: 'Brand voice + rules', mark: '✦', color: '#9b87cc', y: 349, delay: 46},
  {label: 'Past decisions', mark: '↗', color: '#8cbba1', y: 451, delay: 60},
] as const;

const agents = [
  {label: 'Marketing Brain', image: 'marketing-brain-bee.png', color: '#f2bd48', y: 135, delay: 96},
  {label: 'Shopify Agent', image: 'shopify-store-bee.png', color: '#9fc5a6', y: 237, delay: 111},
  {label: 'Calling Agent', image: 'calling-bee.png', color: '#92b9e4', y: 339, delay: 126},
  {label: 'SEO Agent', image: 'seo-bee.png', color: '#ba9ad7', y: 441, delay: 141},
  {label: 'Social Analyst', image: 'social-bee.png', color: '#ec9ca7', y: 543, delay: 156},
] as const;

const appear = (frame: number, delay: number) =>
  interpolate(frame, [delay, delay + 18], [0, 1], {...clamp, easing: ease});

export const QueenBrandBrain: React.FC = () => {
  const frame = useCurrentFrame();
  const loopFade = interpolate(frame, [216, 239], [1, 0], clamp);

  return <AbsoluteFill style={{fontFamily: 'Manrope, Arial, sans-serif', background: '#f7f7f6', color: '#242229', overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 286, top: 167, width: 390, height: 390, borderRadius: '50%', background: 'radial-gradient(circle, #ffe5a991 0%, #ffe6ad45 45%, #ffe6ad00 73%)'}} />

    <div style={{position: 'absolute', left: 54, top: 93, fontSize: 16, fontWeight: 800, letterSpacing: '0.11em', color: '#89837a'}}>APPROVED BRAND KNOWLEDGE</div>
    <div style={{position: 'absolute', left: 670, top: 93, fontSize: 16, fontWeight: 800, letterSpacing: '0.11em', color: '#89837a'}}>SPECIALIST AGENTS</div>

    <svg width="960" height="820" viewBox="0 0 960 820" style={{position: 'absolute', inset: 0}} aria-hidden="true">
      {inputs.map(({label, y, delay}) => <path key={label} d={`M 324 ${y + 36} C 390 ${y + 36}, 383 390, 420 405`} fill="none" stroke="#d3b678" strokeWidth="2" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - appear(frame, delay + 10)} opacity={loopFade} />)}
      {agents.map(({label, y, delay, color}) => <path key={label} d={`M 568 405 C 631 405, 623 ${y + 39}, 670 ${y + 39}`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - appear(frame, delay - 4)} opacity={loopFade} />)}
    </svg>

    {inputs.map(({label, mark, color, y, delay}) => <div key={label} style={{
      position: 'absolute', left: 54, top: y, width: 270, height: 72, padding: '0 17px',
      display: 'flex', alignItems: 'center', gap: 13, borderRadius: 20,
      background: '#fff', border: '1px solid #eeeae1', boxShadow: '0 12px 27px #56472e15',
      opacity: appear(frame, delay) * loopFade,
      translate: `${interpolate(frame, [delay, delay + 18], [-18, 0], clamp)}px 0px`,
    }}>
      <span style={{display: 'grid', placeItems: 'center', width: 39, height: 39, flex: '0 0 auto', borderRadius: 13, background: `${color}30`, color: '#403223', fontSize: 24, fontWeight: 800}}>{mark}</span>
      <span style={{fontSize: 19, fontWeight: 730, letterSpacing: '-0.04em'}}>{label}</span>
    </div>)}

    <div style={{position: 'absolute', left: 349, top: 201, width: 275, height: 315, display: 'grid', placeItems: 'center'}}>
      <Img src={staticFile('queen-brand-brain.png')} style={{width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 17px 19px #6c4a2f28)', transform: `translateY(${Math.sin(frame / 16) * 5}px) scale(${interpolate(frame, [0, 22], [0.91, 1], clamp)})`}} />
    </div>
    <div style={{position: 'absolute', left: 330, top: 520, width: 312, textAlign: 'center'}}>
      <div style={{fontSize: 31, fontWeight: 800, letterSpacing: '-0.06em'}}>Queen Bee</div>
      <div style={{marginTop: 3, fontSize: 18, fontWeight: 650, color: '#7a746b'}}>Your Brand Brain</div>
    </div>

    {agents.map(({label, image, color, y, delay}) => <div key={label} style={{
      position: 'absolute', left: 670, top: y, width: 246, height: 78, padding: '6px 12px 6px 7px',
      display: 'flex', alignItems: 'center', gap: 8, borderRadius: 22,
      background: '#fff', border: `1px solid ${color}80`, boxShadow: '0 12px 25px #56472e12',
      opacity: appear(frame, delay) * loopFade,
      translate: `${interpolate(frame, [delay, delay + 18], [22, 0], clamp)}px 0px`,
    }}>
      <Img src={staticFile(image)} style={{width: 66, height: 66, objectFit: 'contain', flex: '0 0 auto'}} />
      <span style={{fontSize: 18, fontWeight: 750, letterSpacing: '-0.04em', lineHeight: 1.15}}>{label}</span>
    </div>)}

    <div style={{position: 'absolute', left: 179, right: 179, bottom: 47, padding: '16px 22px', borderRadius: 22, background: '#fff9e9', border: '1px solid #f2deb1', textAlign: 'center', opacity: appear(frame, 177) * loopFade}}>
      <div style={{fontSize: 21, fontWeight: 770, letterSpacing: '-0.035em'}}>One brand context. Every agent works from it.</div>
      <div style={{marginTop: 4, fontSize: 15, color: '#857768'}}>Your team reviews the work.</div>
    </div>
  </AbsoluteFill>;
};
