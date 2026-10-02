import {AbsoluteFill, Img, Interactive, staticFile, useCurrentFrame} from 'remotion';
import {ProductArtwork} from './ProductArtwork';

const products = [
  {name: 'Everyday Pendant', kind: 'pendant' as const, x: 54, y: 257, tilt: -5},
  {name: 'Gold Hoops', kind: 'hoops' as const, x: 350, y: 190, tilt: 0},
  {name: 'Layered Ring', kind: 'ring' as const, x: 654, y: 257, tilt: 5},
];

export const StoreGrowthGallery: React.FC = () => {
  const frame = useCurrentFrame();
  const cycle = Math.sin((frame / 240) * Math.PI * 2);

  return <AbsoluteFill style={{fontFamily: 'Manrope, Arial, sans-serif', background: '#f7f7f6', color: '#17171b', overflow: 'hidden'}}>
    <div style={{position: 'absolute', top: 76, left: 62, right: 62, display: 'flex', alignItems: 'center', gap: 19}}>
      <Img src={staticFile('shopify-store-bee.png')} style={{width: 72, height: 72, objectFit: 'contain', filter: 'drop-shadow(0 8px 9px #7a551b24)'}} />
      <div>
        <div style={{fontSize: 17, fontWeight: 760, color: '#8a8171', letterSpacing: '0.08em'}}>YOUR SHOPIFY STOREFRONT</div>
        <div style={{fontSize: 31, fontWeight: 760, letterSpacing: '-0.055em'}}>Help shoppers find the right product.</div>
      </div>
    </div>

    {products.map((product, i) => <Interactive.Div name={`${product.name} product card`} key={product.name} style={{
      position: 'absolute', left: product.x + (i - 1) * cycle * 8, top: product.y + Math.sin(frame / 19 + i) * 5,
      width: i === 1 ? 267 : 252, height: i === 1 ? 406 : 380,
      borderRadius: 24, overflow: 'hidden', background: '#fff',
      boxShadow: i === 1 ? '0 23px 48px #53462a1b' : '0 16px 35px #53462a15',
      rotate: `${product.tilt + cycle * (i - 1) * 1.8}deg`,
    }}>
      <ProductArtwork kind={product.kind} style={{height: '72%', width: '100%'}} />
      <div style={{padding: '17px 19px', fontSize: 21, fontWeight: 750, letterSpacing: '-0.045em'}}>{product.name}</div>
      <div style={{padding: '0 19px', color: '#7b7973', fontSize: 16}}>Discover the details <span style={{float: 'right'}}>↗</span></div>
    </Interactive.Div>)}

    <div style={{position: 'absolute', bottom: 64, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 13, alignItems: 'center', color: '#807b72', fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em'}}>
      <span>DISCOVERY</span><span style={{color: '#c9aa57'}}>→</span><span>PRODUCT PAGE</span><span style={{color: '#c9aa57'}}>→</span><span>CART</span>
    </div>
  </AbsoluteFill>;
};
