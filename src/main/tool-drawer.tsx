import React from "react";
import { registeredTools } from "./tools/tool-registry";
import { rangesTo } from "../common/math";
import { useNavigate } from "react-router-dom";
import { AtomCardGrid, AtomCardProps } from "../atoms/atom-card";
import { AtomColumn, LayoutGap, LayoutSize } from "../atoms/atom-layout";
import { AtomHeroBrandTitleText, AtomHeroTitleText } from "../atoms/atom-text";
import ToolInfo from "./tools/tool-info";
import { BentoItemSize } from "../atoms/atom-bentobox";

const ToolDrawer = () => {
  const navigate = useNavigate();

  const items = rangesTo<ToolInfo, AtomCardProps>(
    registeredTools,
    (tool: ToolInfo) => {
      return {
        title: tool.name,
        description: tool.description,
        image: tool.cover,
        onClick: () => navigate(tool.path),
        centered: true,
        size: BentoItemSize.Medium,
      };
    },
  );

  return (
    <AtomColumn gap={LayoutGap.Small} size={LayoutSize.FullSize}>
      <AtomHeroTitleText className={"text-center"}>
        Creating in <AtomHeroBrandTitleText>Shadows.</AtomHeroBrandTitleText>{" "}
      </AtomHeroTitleText>
      <AtomCardGrid items={items} className={"w-2/3 mt-16"} />
    </AtomColumn>
  );
};

export default ToolDrawer;
