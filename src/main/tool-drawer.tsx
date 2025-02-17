import React from "react";
import { registeredTools } from "./tools/tool-registry";
import { useNavigate } from "react-router-dom";
import {
  AtomColumn,
  AtomRow,
  LayoutGap,
  LayoutSize,
} from "../atoms/atom-layout";
import { AtomHeroBrandTitleText, AtomTitleText } from "../atoms/atom-text";
import { AtomButton, ButtonSeverity, ButtonSize } from "../atoms/atom-button";
import { AtomBackgroundImage } from "../atoms/atom-image";

const ToolDrawer = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  return (
    <AtomColumn gap={LayoutGap.Large} size={LayoutSize.FullSize}>
      <AtomTitleText className={"text-center"}>
        Creating in <AtomHeroBrandTitleText>Shadows.</AtomHeroBrandTitleText>
      </AtomTitleText>

      <AtomBackgroundImage
        src={registeredTools[activeIndex].cover || ""}
        className="w-2/3 h-96 flex flex-row gap-4 items-end justify-center rounded-lg p-4
                    border border-neutral border-opacity-50"
      >
        <AtomButton
          disabled={activeIndex === 0}
          hoverEffect={false}
          onClick={() => setActiveIndex(activeIndex > 0 ? activeIndex - 1 : 0)}
          icon={"fas fa-arrow-left"}
        />
        <AtomButton
          size={ButtonSize.Large}
          severity={ButtonSeverity.Info}
          label={`Open ${registeredTools[activeIndex].name}`}
          icon={"fas fa-external-link-alt"}
          onClick={() => navigate(registeredTools[activeIndex].path)}
        />
        <AtomButton
          disabled={activeIndex === registeredTools.length - 1}
          hoverEffect={false}
          onClick={() =>
            setActiveIndex(
              activeIndex < registeredTools.length - 1
                ? activeIndex + 1
                : registeredTools.length - 1,
            )
          }
          icon={"fas fa-arrow-right"}
        />
      </AtomBackgroundImage>

      <AtomRow>
        {registeredTools.map((tool, index) => (
          <AtomButton
            key={index}
            label={tool.name}
            icon={tool.logo}
            onClick={() => navigate(tool.path)}
            size={ButtonSize.Large}
          />
        ))}
      </AtomRow>
    </AtomColumn>
  );
};

export default ToolDrawer;
