import {
  AtomColumn,
  AtomRow,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../atoms/atom-layout";
import AtomImage from "../atoms/atom-image";
import Sweden from "./assets/photography/sweden.jpg";
import Warsaw1 from "./assets/photography/warsaw-1.jpg";
import Warsaw2 from "./assets/photography/warsaw-2.jpg";
import JustMe from "./assets/photography/manoj.jpg";
import Running from "./assets/photography/running.jpg";
import Northern from "./assets/photography/northern.jpg";
import Denali from "./assets/photography/denali.jpg";
import Alka from "./assets/photography/alka.jpg";

import React from "react";
import { AtomHeroBrandTitleText, AtomHeroTitleText } from "../atoms/atom-text";
import AtomStyledContainer from "../atoms/atom-styled-container";

const PhotographSlides = () => {
  const phs = [
    JustMe,
    Warsaw1,
    Running,
    Northern,
    Sweden,
    Denali,
    Warsaw2,
    Alka,
  ];
  return (
    <AtomRow size={LayoutSize.FullWidth} alignment={LayoutAlign.Start}>
      {phs.map((photo, index) => (
        <AtomImage
          key={index}
          src={photo}
          alt={"photo"}
          className={"w-96 h-96"}
        />
      ))}
    </AtomRow>
  );
};

const Hobbies = () => {
  return (
    <AtomColumn size={LayoutSize.FullSize} gap={LayoutGap.Medium}>
      <AtomHeroTitleText className={"text-center"}>
        Sometimes I do stuff
        <AtomHeroBrandTitleText> for my soul.</AtomHeroBrandTitleText>
      </AtomHeroTitleText>
      {/* Photography */}
      <AtomStyledContainer className={"w-full h-full"} label={"Photography"}>
        <PhotographSlides />
      </AtomStyledContainer>
      {/* Music*/}
      <AtomStyledContainer label={"Music"} className={"w-full h-full"}>
        Making Music
      </AtomStyledContainer>
    </AtomColumn>
  );
};

export default Hobbies;
