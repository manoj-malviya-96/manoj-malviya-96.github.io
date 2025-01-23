import React from "react";
import ToolInfo from "../tool-info";
import Logo from "../logos/mesha.svg";
import AppView from "../app-view";
import { AtomHeroTitleText } from "../../../atoms/atom-text";

const AppName = "MESHA";

const MeshaView = () => {
  return (
    <AppView appName={AppName} appLogo={Logo}>
      <AtomHeroTitleText className={"w-full h-fit text-center"}>
        Coming soon...
      </AtomHeroTitleText>
    </AppView>
  );
};

class Mesha extends ToolInfo {
  constructor() {
    super({
      id: "mesha",
      name: AppName,
      description: "visualize + analyze + edit your 3D mesh",
      cover: Logo,
      componentConstructor: () => <MeshaView />,
    });
  }
}

export default Mesha;
