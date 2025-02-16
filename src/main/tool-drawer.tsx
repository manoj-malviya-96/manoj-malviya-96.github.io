import React from "react";
import { registeredTools } from "./tools/tool-registry";
import { rangesTo } from "../common/math";
import { useNavigate } from "react-router-dom";
import { AtomColumn, LayoutGap, LayoutSize } from "../atoms/atom-layout";
import { AtomHeroBrandTitleText, AtomTitleText } from "../atoms/atom-text";
import ToolInfo from "./tools/tool-info";
import { AtomButton, ButtonSeverity, ButtonSize } from "../atoms/atom-button";
import { AtomButtonBar, TabButtonProps } from "../atoms/atom-bars";
import { AtomBackgroundImage } from "../atoms/atom-image";

const ToolDrawer = () => {
  const navigate = useNavigate();

  const [activeApp, setActiveApp] = React.useState<ToolInfo | null>(null);

  const items = rangesTo<ToolInfo, TabButtonProps>(
    registeredTools,
    (tool: ToolInfo) => {
      return {
        label: tool.name,
        icon: tool.logo,
        onClick: () => setActiveApp(tool),
      };
    },
  );

  return (
    <AtomColumn gap={LayoutGap.Small} size={LayoutSize.FullSize}>
      <AtomTitleText className={"text-center"}>
        Creating in <AtomHeroBrandTitleText>Shadows.</AtomHeroBrandTitleText>
      </AtomTitleText>
      <AtomButtonBar
        items={items}
        buttonSize={ButtonSize.Large}
        className={"my-4"}
      />
      {activeApp && (
        <AtomBackgroundImage
          src={activeApp.cover || ""}
          className={
            "w-2/3 h-96 flex flex-row items-center justify-center rounded-lg"
          }
        >
          <AtomButton
            size={ButtonSize.ExtraLarge}
            severity={ButtonSeverity.Info}
            className={"w-full h-full border"}
            pill={false}
            label={"Open"}
            icon={"fas fa-external-link-alt"}
            onClick={() => navigate(activeApp.path)}
          />
        </AtomBackgroundImage>
      )}
    </AtomColumn>
  );
};

export default ToolDrawer;
