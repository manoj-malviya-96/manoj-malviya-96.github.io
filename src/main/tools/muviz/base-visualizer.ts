import { AtomCanvasController } from "../../../atoms/atom-canvas";
import { AudioFeatures } from "../../../common/audio";

export const MuvizAppColor1 = `rgba(10, 39, 121)`;
export const MuvizAppColor2 = `rgb(147, 47, 214)`;

export class BaseVisualizer extends AtomCanvasController {
  protected features: AudioFeatures | undefined;

  constructor() {
    super();
    this.features = undefined;
  }

  update(features: AudioFeatures) {
    this.features = features;
  }
}
