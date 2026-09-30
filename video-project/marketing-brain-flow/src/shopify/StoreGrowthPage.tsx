import {AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {ProductArtwork} from './ProductArtwork';

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const Signal: React.FC<{name: string; detail: string; left: number; top: number; from: number; color: string}> = ({name, detail, left, top, from, color}) => {
  const frame = useCurrentFrame();
  return <Interactive.Div name={name} style={{
    position: 'absolute', left, top, zIndex: 4, padding: '15px 19px', minWidth: 235, borderRadius: 17,
    background: '#fff', border: '1px solid #edeae3', boxShadow: '0 14px 30px #40332318',
    opacity: interpolate(frame, [from, from + 14], [0, 1], {...clamp, easing: ease}),
    translate: interpolate(frame, [from, from + 16], ['0px 17px', '0px 0px'], {...clamp, easing: ease}),
  }}>
    <div style={{display: 'flex', gap: 10, alignItems: 'center', color: '#25231e', fontSize: 20, fontWeight: 770, letterSpacing: '-0.04em'}}>
      <span style={{width: 10, height: 10, borderRadius: 10, background: color, boxShadow: `0 0 0 5px ${color}25`}} />{name}
    </div>
    <div style={{marginTop: 4, paddingLeft: 20, color: '#77736e', fontSize: 15}}>{detail}</div>
  </Interactive.Div>;
};

export const StoreGrowthPage: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{fontFamily: 'Manrope, Arial, sans-serif', background: '#f7f7f6', color: '#161618', overflow: 'hidden'}}>
    <div style={{position: 'absolute', top: 73, left: 90, display: 'flex', alignItems: 'center', gap: 15}}>
      <Img src={staticFile('shopify-store-bee.png')} style={{width: 63, height: 63, objectFit: 'contain'}} />
      <div style={{fontSize: 27, fontWeight: 780, letterSpacing: '-0.05em'}}>Shopify Store Agent</div>
    </div>
    <div style={{position: 'absolute', top: 157, left: 122, width: 716, height: 526, borderRadius: 22, background: '#fff', border: '1px solid #e9e6df', boxShadow: '0 20px 45px #5b4a2914', overflow: 'hidden'}}>
      <div style={{height: 55, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 25px', borderBottom: '1px solid #f0ede7'}}>
        <span style={{fontSize: 19, fontWeight: 790, letterSpacing: '-0.04em'}}>Your store</span>
        <span style={{fontSize: 13, color: '#89857c', fontWeight: 700}}>NEW IN &nbsp; · &nbsp; JEWELLERY &nbsp; · &nbsp; GIFTS</span>
        <span style={{fontSize: 22}}>♧</span>
      </div>
      <div style={{display: 'flex', gap: 25, padding: 24}}>
        <ProductArtwork kind="pendant" style={{width: 337, height: 343, borderRadius: 15, flex: '0 0 auto'}} />
        <div style={{paddingTop: 19, width: 298}}>
          <div style={{fontSize: 14, color: '#9a8462', fontWeight: 800, letterSpacing: '0.08em'}}>MADE TO WEAR OFTEN</div>
          <div style={{marginTop: 12, fontSize: 36, fontWeight: 750, lineHeight: 1.08, letterSpacing: '-0.06em'}}>Everyday<br />Pendant</div>
          <p style={{margin: '16px 0 18px', color: '#6d6b66', fontSize: 18, lineHeight: 1.45}}>A thoughtful piece for everyday wear.</p>
          <div style={{fontSize: 15, lineHeight: 1.6, color: '#514f49', borderTop: '1px solid #ede9e0', borderBottom: '1px solid #ede9e0', padding: '11px 0'}}>Clear product details<br />Shipping and returns up front</div>
          <div style={{marginTop: 19, borderRadius: 28, background: '#ffce33', padding: '13px 23px', textAlign: 'center', fontSize: 18, fontWeight: 780}}>Add to cart ↗</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 25, bottom: 12, color: '#98958f', fontSize: 13}}>PRODUCT PAGE · ILLUSTRATIVE EXAMPLE</div>
    </div>

    <Signal name="Product clarity" detail="Answer buying questions" left={50} top={245} from={80} color="#f0bf40" />
    <Signal name="Relevant add-on" detail="Help buyers complete the set" left={665} top={650} from={116} color="#e69ea8" />

    <Interactive.Div name="Cart review card" style={{
      position: 'absolute', left: 300, top: 610, width: 346, height: 130, padding: '18px 21px', borderRadius: 18,
      background: '#fff', border: '1px solid #ece8df', boxShadow: '0 15px 32px #433a251a',
      opacity: interpolate(frame, [145, 161], [0, 1], {...clamp, easing: ease}),
      translate: interpolate(frame, [145, 163], ['0px 20px', '0px 0px'], {...clamp, easing: ease}),
    }}>
      <div style={{fontSize: 13, fontWeight: 800, color: '#a17d25', letterSpacing: '0.08em'}}>CART REVIEW</div>
      <div style={{marginTop: 7, fontSize: 24, fontWeight: 760, letterSpacing: '-0.055em'}}>A helpful next step.</div>
      <div style={{marginTop: 5, fontSize: 16, color: '#77736b'}}>Relevant additions, reviewed with margin.</div>
    </Interactive.Div>
    <div style={{position: 'absolute', left: 63, bottom: 35, fontSize: 14, fontWeight: 730, color: '#aaa69d', letterSpacing: '0.08em'}}>ONE CHANGE AT A TIME · MEASURE THE RESULT</div>
  </AbsoluteFill>;
};
