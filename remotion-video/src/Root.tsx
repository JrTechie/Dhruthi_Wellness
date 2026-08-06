import "./index.css";
import { Composition } from "remotion";
import { EatingMain } from "./EatingMain";
import { EditorialMain } from "./EditorialMain";
import { HypeMain } from "./HypeMain";
import { Main } from "./Main";
import { StressMain } from "./StressMain";
import { WeightLossMain } from "./WeightLossMain";
import { PCOSMain } from "./PCOSMain";
import { MetabolismMain } from "./MetabolismMain";
import { BalancedPlateMain } from "./BalancedPlateMain";
import { MorningDrinksMain } from "./MorningDrinksMain";
import { BreastfeedingMain } from "./BreastfeedingMain";
import { BreastfeedingHydrationMain } from "./BreastfeedingHydrationMain";
import { FlowchartMain } from "./FlowchartMain";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FlowchartReel"
        component={FlowchartMain}
        durationInFrames={1600} // 53.33 seconds * 30 fps (Matches User's Original Recorded Voiceover)
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BreastfeedingWithHydration"
        component={BreastfeedingHydrationMain}
        durationInFrames={900} // 30 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BreastfeedingReel"
        component={BreastfeedingMain}
        durationInFrames={900} // 30 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BalancedPlate"
        component={BalancedPlateMain}
        durationInFrames={1350} // 45 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MorningDrinks"
        component={MorningDrinksMain}
        durationInFrames={900} // 30 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Metabolism"
        component={MetabolismMain}
        durationInFrames={900} // 30 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Eating"
        component={EatingMain}
        durationInFrames={1230} // 41 seconds * 30 fps (9s per scene)
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HypeReel"
        component={HypeMain}
        durationInFrames={840} // 28 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EditorialReel"
        component={EditorialMain}
        durationInFrames={840} // 28 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="WeightLossReel"
        component={WeightLossMain}
        durationInFrames={840} // 28 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PCOSReel"
        component={PCOSMain}
        durationInFrames={1320} // 44 seconds * 30 fps (extended Scene 4)
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Main"
        component={Main}
        durationInFrames={840} // 28 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Stress"
        component={StressMain}
        durationInFrames={1050} // 35 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};




