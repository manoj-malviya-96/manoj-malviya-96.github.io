import { AtomDropdownItemProps } from "../../../atoms/atom-dropdown";
import { AbstractVisualizer } from "./abstract-visualizer";
import { DevModeVisualizer } from "./devmode-visualizer";

export enum VisualizerType {
  Abstract = 0,
  DeveloperMode = 1,
}

export function createVisualizer(vizType: VisualizerType) {
  switch (vizType) {
    case VisualizerType.DeveloperMode:
      return DevModeVisualizer;
    case VisualizerType.Abstract:
      return AbstractVisualizer;
    default:
      throw new Error("Invalid visualizer type");
  }
}

export const defaultVizOptions = [
  {
    label: "Abstract",
    value: VisualizerType.Abstract,
  } as AtomDropdownItemProps,
  {
    label: "DevMode",
    value: VisualizerType.DeveloperMode,
  } as AtomDropdownItemProps,
];
