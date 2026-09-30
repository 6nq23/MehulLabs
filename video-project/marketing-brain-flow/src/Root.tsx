import "./index.css";
import { MyComposition } from "./Composition";
import { Composition, Folder } from "remotion";
import { ShopifyGrowth } from "./shopify/ShopifyGrowth";
import { StoreGrowthGallery } from "./shopify/StoreGrowthGallery";
import { StoreGrowthPage } from "./shopify/StoreGrowthPage";
import { QueenBrandBrain } from "./queen/QueenBrandBrain";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Composition id="QueenBrandBrain" component={QueenBrandBrain} durationInFrames={240} fps={30} width={960} height={820} />
      <Folder name="ShopifyGrowthScenes">
        <Composition id="StoreGrowthGallery" component={StoreGrowthGallery} durationInFrames={240} fps={30} width={960} height={820} />
        <Composition id="StoreGrowthPage" component={StoreGrowthPage} durationInFrames={240} fps={30} width={960} height={820} />
      </Folder>
      <Composition id="ShopifyGrowth" component={ShopifyGrowth} durationInFrames={240} fps={30} width={960} height={820} />
    </>
  );
};
