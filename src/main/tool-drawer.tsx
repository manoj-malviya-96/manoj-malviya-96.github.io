import React from "react";
import { registeredTools } from "./tools/tool-registry";
import { rangesTo } from "../common/math";
import { useNavigate } from "react-router-dom";
import AtomCard, { AtomCardProps } from "../atoms/atom-card";
import {
  AtomColumn,
  AtomGrid,
  GridColumns,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../atoms/atom-layout";
import { AtomHeroBrandTitleText, AtomTitleText } from "../atoms/atom-text";
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
      <AtomTitleText className={"text-center"}>
        Creating in <AtomHeroBrandTitleText>Shadows.</AtomHeroBrandTitleText>{" "}
      </AtomTitleText>
      <AtomGrid
        size={LayoutSize.Fit}
        gap={LayoutGap.Medium}
        nCols={GridColumns.Four}
        alignment={LayoutAlign.Start}
        className={"w-1/2 mt-16"}
      >
        {items.map((item, index) => (
          <AtomCard {...item} key={index} />
        ))}
      </AtomGrid>
    </AtomColumn>
  );
};

export default ToolDrawer;
