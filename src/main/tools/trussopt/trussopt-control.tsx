import AtomStyledContainer from "../../../atoms/atom-styled-container";
import {
  AtomGrid,
  AtomRow,
  LayoutGap,
  LayoutSize,
} from "../../../atoms/atom-layout";
import AtomSlider from "../../../atoms/atom-slider";
import { MouseMode } from "./truss-controller";
import AtomDropdown from "../../../atoms/atom-dropdown";
import { LatticeType } from "./truss-mesh";
import AtomToggleButton from "../../../atoms/atom-toggle-button";
import {
  AtomButton,
  ButtonSeverity,
  ButtonType,
} from "../../../atoms/atom-button";
import React from "react";

interface TrussOptControlProps {
  mouseMode: MouseMode;
  changeMouseMode: (mode: MouseMode) => void;
  onMeshWidthChange: (width: number) => void;
  onMeshHeightChange: (height: number) => void;
  onCellSizeChange: (size: number) => void;
  onLatticeTypeChange: (type: LatticeType) => void;
  onOptimize: () => void;
  onClearOptimize: () => void;
  onSimulate: () => void;
  onClearSimulate: () => void;
  onNumIterationChange: (iterations: number) => void;
  onTargetFunctionChange: (fraction: number) => void;
  numIterations: number;
  targetFraction: number;
  meshWidth: number;
  meshHeight: number;
  cellSize: number;
  hasSimulationResult: boolean;
}

const TrussOptControl: React.FC<TrussOptControlProps> = React.memo(
  ({
    mouseMode,
    changeMouseMode,
    onMeshWidthChange,
    onMeshHeightChange,
    onCellSizeChange,
    onLatticeTypeChange,
    onOptimize,
    onClearOptimize,
    hasSimulationResult,
    onSimulate,
    onClearSimulate,
    onNumIterationChange,
    onTargetFunctionChange,
    numIterations,
    targetFraction,
    meshWidth,
    meshHeight,
    cellSize,
  }) => {
    return (
      <div
        className="w-full h-full md:w-1/4 md:h-full
                        flex flex-col gap-2 shrink-0"
      >
        {/* This is the Design Initial Truss section */}
        <AtomStyledContainer
          label={"Design Initial Truss"}
          transparency={false}
          scrollable={false}
        >
          <AtomGrid gap={LayoutGap.Small} size={LayoutSize.FullWidth}>
            <AtomSlider
              label="Width"
              className="w-full h-fit"
              min={cellSize}
              max={100}
              step={cellSize}
              value={meshWidth}
              onChange={onMeshWidthChange}
              disabled={mouseMode !== MouseMode.None}
            />
            <AtomSlider
              label="Height"
              min={cellSize}
              max={100}
              step={cellSize}
              className="w-full h-fit"
              value={meshHeight}
              onChange={onMeshHeightChange}
              disabled={mouseMode !== MouseMode.None}
            />
            <AtomSlider
              label="Cell Size"
              min={5}
              max={20}
              step={5}
              className="w-full h-fit"
              value={cellSize}
              onChange={onCellSizeChange}
              disabled={mouseMode !== MouseMode.None}
            />
            <AtomDropdown
              placeholder="Select Lattice Type"
              initialIndex={0}
              dropdownIcon={"fas fa-layer-group"}
              disabled={mouseMode !== MouseMode.None}
              options={[
                {
                  label: "Cross",
                  value: LatticeType.Cross,
                },
                {
                  label: "Checker",
                  value: LatticeType.Checkerboard,
                },
              ]}
              className={"w-24 mx-auto mt-6"}
              onClick={onLatticeTypeChange}
            />
          </AtomGrid>
        </AtomStyledContainer>

        {/* This is the FEA Controls section */}
        <AtomStyledContainer label={"FEA Controls"} scrollable={false}>
          <AtomRow size={LayoutSize.FullWidth} gap={LayoutGap.Small}>
            <AtomToggleButton
              offIcon="fas fa-lock-open"
              onIcon="fas fa-lock"
              tooltip="Add fix nodes to the truss"
              initValue={false}
              disabled={mouseMode === MouseMode.AddForce}
              onChange={(e) => {
                if (e) {
                  changeMouseMode(MouseMode.AddFixed);
                } else {
                  changeMouseMode(MouseMode.None);
                }
              }}
            />
            <AtomToggleButton
              offIcon="fas fa-arrow-up"
              onIcon="fas fa-arrow-down"
              tooltip="Add Load nodes to the truss"
              initValue={false}
              disabled={mouseMode === MouseMode.AddFixed}
              onChange={(e) => {
                if (e) {
                  changeMouseMode(MouseMode.AddForce);
                } else {
                  changeMouseMode(MouseMode.None);
                }
              }}
            />
            <AtomToggleButton
              offLabel="Simulate"
              offIcon="fas fa-play"
              onIcon="fas fa-stop"
              tooltip="simulate the truss"
              className={"w-fit"}
              initValue={hasSimulationResult}
              disabled={mouseMode !== MouseMode.None}
              type={ButtonType.Outlined}
              onChange={(e: boolean) => {
                if (e) {
                  onSimulate();
                } else {
                  onClearSimulate();
                }
              }}
            />
          </AtomRow>
        </AtomStyledContainer>

        {/* This is the Optimization section */}
        <AtomStyledContainer
          label={"Optimization"}
          className={"w-full"}
          scrollable={false}
        >
          <AtomGrid size={LayoutSize.FullWidth} gap={LayoutGap.Medium}>
            <AtomSlider
              label="Iterations"
              min={5}
              max={500}
              step={5}
              className="w-full h-fit"
              value={numIterations}
              onChange={onNumIterationChange}
              disabled={mouseMode !== MouseMode.None}
            />
            <AtomSlider
              label="Target"
              min={0.1}
              max={0.9}
              step={0.1}
              className="w-full h-fit"
              value={targetFraction}
              onChange={onTargetFunctionChange}
              disabled={mouseMode !== MouseMode.None}
            />

            <AtomButton
              label="Optimize"
              icon="fas fa-bolt-lightning"
              severity={ButtonSeverity.Info}
              tooltip={"optimize the truss"}
              onClick={onOptimize}
              disabled={mouseMode !== MouseMode.None}
            />
            <AtomButton
              icon="fas fa-trash"
              label={"Clear"}
              severity={ButtonSeverity.Error}
              tooltip={"clear optimization results"}
              onClick={onClearOptimize}
              disabled={mouseMode !== MouseMode.None}
            />
          </AtomGrid>
        </AtomStyledContainer>
      </div>
    );
  },
);

export default TrussOptControl;
