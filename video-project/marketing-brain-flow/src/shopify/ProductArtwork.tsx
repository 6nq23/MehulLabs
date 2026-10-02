import type {CSSProperties} from 'react';

type Product = 'pendant' | 'hoops' | 'ring';

const gold = '#b98b42';
const shadow = '#8e682f';

/** Illustrative product artwork for the fictional storefront in this video. */
export const ProductArtwork: React.FC<{kind: Product; style?: CSSProperties}> = ({kind, style}) => (
  <div style={{display: 'grid', placeItems: 'center', background: 'radial-gradient(circle at 50% 38%, #fffaf0, #eee7d9 75%)', overflow: 'hidden', ...style}}>
    <svg viewBox="0 0 260 260" width="82%" height="82%" aria-hidden="true" style={{filter: 'drop-shadow(0 13px 11px #86694727)'}}>
      {kind === 'pendant' && <>
        <path d="M66 25 C72 98 97 143 130 166 C163 143 188 98 194 25" fill="none" stroke={gold} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M75 29 C86 109 104 140 130 157 C156 140 174 109 185 29" fill="none" stroke="#e6c889" strokeWidth="1.5" />
        <circle cx="130" cy="174" r="35" fill="#d5aa5d" stroke={shadow} strokeWidth="2" />
        <circle cx="130" cy="174" r="27" fill="#f9e7bd" stroke="#fff7de" strokeWidth="3" />
        <path d="M130 151 L147 174 L130 197 L113 174 Z" fill="#e9c781" stroke="#bd9148" strokeWidth="2" />
        <path d="M130 153 L140 174 L130 187 L119 174 Z" fill="#fff8df" opacity=".75" />
      </>}
      {kind === 'hoops' && <>
        <ellipse cx="88" cy="126" rx="38" ry="65" fill="none" stroke={gold} strokeWidth="14" />
        <ellipse cx="175" cy="126" rx="38" ry="65" fill="none" stroke={gold} strokeWidth="14" />
        <path d="M53 106 C55 74 66 63 83 61 M140 106 C142 74 153 63 170 61" fill="none" stroke="#f8dda0" strokeWidth="5" strokeLinecap="round" />
        <circle cx="88" cy="60" r="8" fill="#fff9e5" stroke="#b58e57" strokeWidth="3" />
        <circle cx="175" cy="60" r="8" fill="#fff9e5" stroke="#b58e57" strokeWidth="3" />
      </>}
      {kind === 'ring' && <>
        <ellipse cx="130" cy="160" rx="66" ry="45" fill="none" stroke={gold} strokeWidth="18" />
        <path d="M73 140 C95 121 165 121 187 140" fill="none" stroke="#f1d6a1" strokeWidth="5" />
        <path d="M130 65 L160 95 L130 127 L100 95 Z" fill="#f8ebcf" stroke={gold} strokeWidth="8" />
        <path d="M130 69 L150 95 L130 114 L109 95 Z" fill="#fffcf2" stroke="#e0c68e" strokeWidth="2" />
      </>}
    </svg>
  </div>
);
