import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {StoreGrowthGallery} from './StoreGrowthGallery';
import {StoreGrowthPage} from './StoreGrowthPage';

export const ShopifyGrowth: React.FC = () => {
  const frame = useCurrentFrame();
  const pageOpacity = interpolate(frame, [42, 65, 189, 213], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return <AbsoluteFill>
    <StoreGrowthGallery />
    <AbsoluteFill style={{opacity: pageOpacity}}><StoreGrowthPage /></AbsoluteFill>
  </AbsoluteFill>;
};
