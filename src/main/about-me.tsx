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
import { GithubView } from "./github";
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

const AboutMe = () => {
  return (
    <AtomRow
      size={LayoutSize.FullSize}
      gap={LayoutGap.Large}
      alignment={LayoutAlign.Start}
      smallDeviceAdjustment={true}
      className={"mt-4 h-full px-6"}
    >
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
