import React from "react";
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";

import {
  AtomPrimaryText,
  AtomSuperHeroBrandTitleText,
} from "../atoms/atom-text";
import { AtomColumn, LayoutGap } from "../atoms/atom-layout";
import { useTheme } from "../providers/theme";
import CoverDark from "./assets/cover-dark.gif";
import CoverLight from "./assets/cover-light.gif";

const Intro = () => {
  const { isDark } = useTheme();
  return (
    <AtomFullScreenContainer
      name="intro"
      backgroundImage={isDark ? CoverDark : CoverLight}
    >
      <AtomColumn smallDeviceAdjustment={true} gap={LayoutGap.None}>
        <AtomPrimaryText className={"w-full text-center"}>
          Manoj Malviya
        </AtomPrimaryText>

        <AtomSuperHeroBrandTitleText className={"text-center w-fit md:w-1/2"}>
          {" "}
          Creating Tools for Humanity
        </AtomSuperHeroBrandTitleText>
      </AtomColumn>
    </AtomFullScreenContainer>
  );
};

export default Intro;
