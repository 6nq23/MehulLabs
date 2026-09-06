import { ImageResponse } from 'next/og';

export const alt = 'Mehul Labs — D2C infrastructure and focused AI automation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#f7f7f2', color: '#202720', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', fontSize: 34, letterSpacing: '-2px' }}>mehul labs.</div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 72, letterSpacing: '-3px', lineHeight: 1.1 }}>
        <div style={{ display: 'flex' }}>D2C infrastructure.</div>
        <div style={{ display: 'flex', color: '#496546' }}>Focused AI automation.</div>
      </div>
      <div style={{ display: 'flex', paddingTop: 28, borderTop: '1px solid #d8ddd1', fontSize: 23, color: '#586056' }}>Order operations · COD calling · Meta creatives · SEO</div>
    </div>,
    size,
  );
}
