import React from "react";
import ToolInfo from "../tool-info";
import Logo from "../logos/mesha.svg";
import AppView from "../app-view";
import AtomThreeCanvas from "../../../atoms/three/atom-three-canvas";
import { ExampleCubeMesh } from "../../../atoms/three/atom-three-mesh";

const AppName = "MESHA";

const MeshaView = () => {
  const cubeMesh = new ExampleCubeMesh();

  return (
    <AppView appName={AppName} appLogo={Logo}>
      <AtomThreeCanvas meshes={[cubeMesh]} />
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
