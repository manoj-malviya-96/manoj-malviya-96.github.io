import { AtomCanvasController } from "../../../atoms/canvas/atom-canvas-controller";
import { AudioFeatures } from "../../../common/audio";

export const MuvizAppColor1 = `rgba(10, 39, 121)`;
export const MuvizAppColor2 = `rgb(147, 47, 214)`;

export abstract class BaseVisualizer extends AtomCanvasController {
  protected features: AudioFeatures | undefined;

  protected constructor() {
    super();
    this.features = undefined;
    this.isStatic = false;
  }

  update(features: AudioFeatures) {
    this.features = features;
  }
}
