import React from "react";
import { AtomColumn, LayoutAlign, LayoutGap } from "./atom-layout";
import { AtomHeroTitleText, AtomSecondaryText } from "./atom-text";

export enum StatSeverity {
  Primary = "text-primary-content",
  Info = "text-info",
  Success = "text-success",
  Warning = "text-warning",
  Danger = "text-danger",
}

export type Stats = undefined | number | string;

interface AtomStatsProps {
  text: string;
  value: Stats;
  className?: string;
  severity?: StatSeverity;
}

const AtomStats: React.FC<AtomStatsProps> = React.memo(
  ({ text, value, severity, className }) => {
    return (
      <AtomColumn
        className={className}
        alignment={LayoutAlign.Center}
        gap={LayoutGap.None}
      >
        <AtomSecondaryText>{text}</AtomSecondaryText>
        <AtomHeroTitleText className={severity}>
          {value || "---"}
        </AtomHeroTitleText>
      </AtomColumn>
    );
  },
);

export default AtomStats;
