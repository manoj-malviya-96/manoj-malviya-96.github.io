import {
  AtomColumn,
  AtomRow,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../atoms/atom-layout";
import AtomImage from "../atoms/atom-image";

import React from "react";
import { AtomHeroBrandTitleText, AtomHeroTitleText } from "../atoms/atom-text";
import AtomStyledContainer from "../atoms/atom-styled-container";
import YoutubePlayer from "../atoms/misc/youtube-player";

import Sweden from "./assets/photography/sweden-min.jpg";
import Warsaw1 from "./assets/photography/warsaw-1-min.jpg";
import Warsaw2 from "./assets/photography/warsaw-2-min.jpg";
import JustMe from "./assets/photography/manoj-min.jpg";
import Running from "./assets/photography/running-min.jpg";
import Northern from "./assets/photography/northern-min.jpg";
import Denali from "./assets/photography/denali-min.jpg";
import Alka from "./assets/photography/alka-min.jpg";
import Lights from "./assets/photography/lights.jpeg";
import Budapest from "./assets/photography/budapest.jpeg";
import Mallorca from "./assets/photography/mallorca.jpg";
import Walk from "./assets/photography/walk.jpeg";
import Mash from "./assets/photography/mash.jpg";
import Pretty from "./assets/photography/pretty.jpg";
import Sky from "./assets/photography/sky.jpg";
import Stf from "./assets/photography/stuf.jpg";

const PhotographSlides = () => {
  const phs = [
    Mash,
    JustMe,
    Lights,
    Budapest,
    Mallorca,
    Walk,
    Pretty,
    Sky,
    Stf,
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
          preview={false}
          className={"w-72 h-72"}
        />
      ))}
    </AtomRow>
  );
};

const MusicSlides = () => {
  const videos = ["vDuYpe-dLc8", "n5niNBh6f3s", "me-Np1H5AT0", "yOAvoG5HPJM"];
  return (
    <AtomRow
      size={LayoutSize.FullWidth}
      alignment={LayoutAlign.CenterBetween}
      smallDeviceAdjustment
    >
      {videos.map((vid, index) => (
        <YoutubePlayer key={index} vid={vid} className={"w-72 h-48"} />
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
        <MusicSlides />
      </AtomStyledContainer>
    </AtomColumn>
  );
};

export default Hobbies;
