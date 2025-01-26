import { AtomDropdownItemProps } from "../../../atoms/atom-dropdown";
import { AbstractVisualizer } from "./abstract-visualizer";

export enum VisualizerType {
  Abstract = 0,
  Spiral = 1,
}

export function createVisualizer(vizType: VisualizerType) {
  switch (vizType) {
    case VisualizerType.Spiral:
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
];
