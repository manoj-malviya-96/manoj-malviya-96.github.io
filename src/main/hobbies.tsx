import {
  AtomColumn,
  AtomRow,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../atoms/atom-layout";
import AtomImage from "../atoms/atom-image";

import Sweden from "./assets/photography/sweden-min.jpg";
import Warsaw1 from "./assets/photography/warsaw-1-min.jpg";
import Warsaw2 from "./assets/photography/warsaw-2-min.jpg";
import JustMe from "./assets/photography/manoj-min.jpg";
import Running from "./assets/photography/running-min.jpg";
import Northern from "./assets/photography/northern-min.jpg";
import Denali from "./assets/photography/denali-min.jpg";
import Alka from "./assets/photography/alka-min.jpg";

import React, { useState } from "react";
import { AtomHeroBrandTitleText, AtomHeroTitleText } from "../atoms/atom-text";
import AtomStyledContainer from "../atoms/atom-styled-container";
import YoutubeMusicPlayer from "../atoms/misc/youtube-music-player";
import { AtomButtonBar, TabButtonProps } from "../atoms/atom-bars";

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
          className={"w-72 h-72"}
        />
      ))}
    </AtomRow>
  );
};

const MusicSlides = () => {
  const [vid, setVid] = useState<string>("");
  const videos = [
    {
      label: "Shadows",
      onClick: () => {
        setVid("yOAvoG5HPJM");
      },
    },
    {
      label: "You and Me",
      onClick: () => {
        setVid("me-Np1H5AT0");
      },
    },
    {
      label: "Show My Love",
      onClick: () => {
        setVid("vDuYpe-dLc8");
      },
    },
    {
      label: "Better than this",
      onClick: () => {
        setVid("n5niNBh6f3s");
      },
    },
  ] as TabButtonProps[];

  return (
    <AtomRow
      size={LayoutSize.FullWidth}
      alignment={LayoutAlign.CenterBetween}
      smallDeviceAdjustment
    >
      <AtomButtonBar items={videos} className={"w-1/2 min-w-fit mt-6"} />
      <YoutubeMusicPlayer vid={vid} />
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
