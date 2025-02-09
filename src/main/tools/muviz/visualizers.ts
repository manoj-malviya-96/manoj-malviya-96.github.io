import { AtomDropdownItemProps } from "../../../atoms/atom-dropdown";
import { AbstractVisualizer } from "./abstract-visualizer";
import { DevModeVisualizer } from "./devmode-visualizer";
import { RandomVisualizer } from "./random-visualizer";

export enum VisualizerType {
  Abstract = 0,
  DeveloperMode = 1,
  Random = 2,
}

export function createVisualizer(vizType: VisualizerType) {
  switch (vizType) {
    case VisualizerType.DeveloperMode:
      return DevModeVisualizer;
    case VisualizerType.Abstract:
      return AbstractVisualizer;
    case VisualizerType.Random:
      return RandomVisualizer;
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
    label: "Random",
    value: VisualizerType.Random,
  },
  {
    label: "DevMode",
    value: VisualizerType.DeveloperMode,
  },
];
