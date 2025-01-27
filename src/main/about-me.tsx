import React from "react";
import { jobRelatedBlogs } from "./blogs/blog-registry";
import { rangesTo } from "../common/math";
import { openLink } from "../common/links";
import {
  AtomButton,
  AtomButtonProps,
  ButtonSize,
  ButtonType,
} from "../atoms/atom-button";
import AtomStyledContainer from "../atoms/atom-styled-container";
import { useNavigate } from "react-router-dom";
import AtomTimeline from "../atoms/atom-timeline";
import { AtomHeroBrandTitleText, AtomPrimaryText } from "../atoms/atom-text";
import {
  AtomColumn,
  AtomColumnDivider,
  AtomRow,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../atoms/atom-layout";
import ProfilePicture from "./assets/main.jpeg";
import { GithubView } from "./github";
import AtomImage from "../atoms/atom-image";

type SocialMediaLink = [icon: string, link: string, tooltip: string];
const MySocialMediaLinks: Array<SocialMediaLink> = [
  [
    "fa-brands fa-linkedin",
    "https://www.linkedin.com/in/manoj-malviya-44700aa4/",
    "linkedin",
  ],
  ["fa-brands fa-github", "https://github.com/manoj-malviya-96", "github"],
  [
    "fa-brands fa-google",
    "https://scholar.google.com/citations?user=0oMXOy0AAAAJ&hl=en&authuser=2",
    "google scholar",
  ],
  [
    "fa-brands fa-instagram",
    "https://www.instagram.com/manoj_malviya_/",
    "instagram",
  ],
  [
    "fa-brands fa-youtube",
    "https://www.youtube.com/@manoj_malviya_",
    "youtube",
  ],
  [
    "fa-brands fa-apple",
    "https://music.apple.com/us/artist/manoj-malviya/1721435458",
    "apple music",
  ],
];
const SocialMediaButtons = () => {
  const socialMediaItems = rangesTo(
    MySocialMediaLinks,
    (smLink: SocialMediaLink) => {
      return {
        icon: smLink[0],
        type: ButtonType.Ghost,
        size: ButtonSize.Large,
        onClick: () => openLink(smLink[1], null),
        tooltip: smLink[2],
      } as AtomButtonProps;
    },
  );
  return (
    <AtomRow
      size={LayoutSize.FullWidth}
      alignment={LayoutAlign.Start}
      gap={LayoutGap.None}
    >
      {socialMediaItems.map((item, index) => (
        <AtomButton key={index} {...item} />
      ))}
    </AtomRow>
  );
};

const CareerHighlights = () => {
  const navigate = useNavigate();
  const timelineData = rangesTo(jobRelatedBlogs, (blog) => {
    return {
      title: blog.title,
      date: blog.date,
      icon: blog.logo,
      description: blog.description,
      onClick: () => navigate(blog.path),
    };
  });
  return <AtomTimeline items={timelineData} className={"w-full h-full"} />;
};

const WhoIsManoj = () => {
  return (
    <AtomColumn
      size={LayoutSize.None}
      gap={LayoutGap.Small}
      className={"w-fit md:w-1/3"}
    >
      <AtomImage src={ProfilePicture} alt={"Cover"} className={"w-full h-64"} />
      <AtomHeroBrandTitleText className={"w-full mt-4"}>
        Manoj Malviya
      </AtomHeroBrandTitleText>
      <AtomPrimaryText className={"w-fit p-0 justify-start"}>
        I’m a Software Engineer with over 6 years of experience in Physics
        Simulation, CAD, and Software development (Desktop/Web). I’m known for
        leading innovative projects with a product-focused approach that aligns
        well with business goals.
      </AtomPrimaryText>
      <SocialMediaButtons />
    </AtomColumn>
  );
};

const AboutMe = () => {
  return (
    <AtomRow
      size={LayoutSize.FullSize}
      gap={LayoutGap.Large}
      alignment={LayoutAlign.Start}
      smallDeviceAdjustment={true}
      className={"mt-4 h-full px-6"}
    >
      <WhoIsManoj />
      <AtomStyledContainer className={"w-full h-full"} transparency={true}>
        <AtomColumn size={LayoutSize.FullSize} gap={LayoutGap.Small}>
          <CareerHighlights />
          <AtomColumnDivider />
          <GithubView />
        </AtomColumn>
      </AtomStyledContainer>
    </AtomRow>
  );
};

export default AboutMe;
