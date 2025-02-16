import React from "react";
import ToolInfo from "../tool-info";
import Logo from "../logos/mesha.svg";
import AppView from "../app-view";
import AtomThreeCanvas from "../../../atoms/three/atom-three-canvas";
import { ExampleCubeMesh } from "../../../atoms/three/atom-three-mesh";
import AtomInViewContainer from "../../../atoms/atom-in-view-container";

const AppName = "MESHA";

const MeshaView = () => {
  const [show, setShow] = React.useState(false);
  const cubeMesh = new ExampleCubeMesh();

  return (
    <AppView appName={AppName} appLogo={Logo}>
      <AtomInViewContainer onInView={() => setShow(true)}>
        {show && <AtomThreeCanvas meshes={[cubeMesh]} />}
      </AtomInViewContainer>
    </AppView>
  );
};

class Mesha extends ToolInfo {
  constructor() {
    super({
      id: "mesha",
      name: AppName,
      description: "visualize + analyze + edit your 3D mesh",
      logo: Logo,
      componentConstructor: () => <MeshaView />,
    });
  }
}

export default Mesha;
