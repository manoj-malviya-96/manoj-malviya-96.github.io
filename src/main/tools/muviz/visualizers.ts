import { AtomDropdownItemProps } from "../../../atoms/atom-dropdown";
import { AbstractVisualizer } from "./abstract-visualizer";
import { DevModeVisualizer } from "./devmode-visualizer";
import { ImagineVisualizer } from "./imagine-visualizer";

export enum VisualizerType {
  Abstract = 0,
  DeveloperMode = 1,
  Imagine = 2,
}

export function createVisualizer(vizType: VisualizerType) {
  switch (vizType) {
    case VisualizerType.DeveloperMode:
      return DevModeVisualizer;
    case VisualizerType.Abstract:
      return AbstractVisualizer;
    case VisualizerType.Imagine:
      return ImagineVisualizer;
    default:
      throw new Error("Invalid visualizer type");
  }
}

export const defaultVizOptions: AtomDropdownItemProps[] = [
  {
    label: "Abstract",
    value: VisualizerType.Abstract,
  },
  {
    label: "Imagine",
    value: VisualizerType.Imagine,
  },
  {
    label: "DevMode",
    value: VisualizerType.DeveloperMode,
  },
];
