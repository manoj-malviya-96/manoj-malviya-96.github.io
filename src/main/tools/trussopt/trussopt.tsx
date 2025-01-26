import React, { useCallback, useEffect, useState } from "react";
import ToolInfo from "../tool-info";
import Logo from "../logos/trussopt.svg";
import AppView from "../app-view";
import AtomToggleButton from "../../../atoms/atom-toggle-button";
import {
  AtomButton,
  ButtonSeverity,
  ButtonType,
} from "../../../atoms/atom-button";
import AtomDropdown from "../../../atoms/atom-dropdown";
import { MouseMode, TrussStructureView, useTrussOpt } from "./truss-controller";
import TrussMesh, { LatticeType } from "./truss-mesh";
import { AtomCanvas } from "../../../atoms/atom-canvas";
import { useTheme } from "../../../providers/theme";
import AtomStats, { StatSeverity } from "../../../atoms/atom-stats";
import TrussFea, { TrussFeaResults } from "./truss-fea";
import TrussOptimizer from "./truss-optimizer";
import AtomStyledContainer from "../../../atoms/atom-styled-container";
import {
  AtomGrid,
  AtomRow,
  LayoutGap,
  LayoutSize,
} from "../../../atoms/atom-layout";
import AtomSlider from "../../../atoms/atom-slider";
import TrussOptControl from "./trussopt-control";
import TrussOptOutput from "./trussopt-output";

const TrussOptView = () => {
  const {
    meshWidth,
    setMeshWidth,
    meshHeight,
    setMeshHeight,
    cellSize,
    setCellSize,
    setLatticeType,
    mesh,
  } = useTrussOpt();

  const { daisyPrimaryText } = useTheme();

  const controller = React.useMemo(() => {
    return new TrussStructureView();
  }, []);

  const [canvasLoading, setCanvasLoading] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<TrussFeaResults | null>(null);
  const [optimizeMesh, setOptimizeMesh] = useState<TrussMesh | null>(null);
  const [numIterations, setNumIterations] = useState<number>(100);
  const [targetFraction, setTargetFraction] = useState<number>(0.3);
  const [mouseMode, setMouseMode] = useState<MouseMode>(MouseMode.None);

  useEffect(() => {
    controller.trussColor = daisyPrimaryText;
    controller.feaEngine = null;
    if (optimizeMesh) {
      controller.updateMesh(optimizeMesh);
    } else {
      controller.updateMesh(mesh);
    }
  }, [controller, mesh, optimizeMesh, daisyPrimaryText]);

  const simulate = useCallback(() => {
    const feaEngine = optimizeMesh
      ? new TrussFea(optimizeMesh)
      : mesh
        ? new TrussFea(structuredClone(mesh))
        : null;
    if (!feaEngine) {
      throw new Error("Null Scene");
    }

    feaEngine.compute();
    controller.addFeaResults(feaEngine);
    setSimResult(feaEngine.getResults());
  }, [controller, optimizeMesh, mesh]);

  const clearSimulate = useCallback(() => {
    setSimResult(null);
    controller.addFeaResults(null);
  }, [controller, setSimResult]);

  const clearOptimize = useCallback(() => {
    setOptimizeMesh(null);
    setSimResult(null);
    controller.addFeaResults(null);
  }, [controller]);

  const optimize = useCallback(async () => {
    setCanvasLoading(true);
    if (!mesh) {
      throw new Error("Null Scene");
    }
    const optimizer = new TrussOptimizer(
      structuredClone(mesh),
      numIterations,
      targetFraction,
    );
    try {
      await optimizer.optimize();
      if (optimizer.success) {
        setOptimizeMesh(optimizer.currentMesh);
        controller.addFeaResults(null);
        setSimResult(optimizer.lastFEAResult);
      } else {
        clearOptimize();
      }
    } catch (e: any) {
      console.error(e);
      clearOptimize();
    }
    setCanvasLoading(false);
  }, [mesh, controller, clearOptimize, numIterations, targetFraction]);

  useEffect(() => {
    clearOptimize();
  }, [mesh, numIterations, targetFraction, clearOptimize]);

  useEffect(() => {
    clearOptimize();
    clearSimulate();
    controller.updateMouseMode(mouseMode);
  }, [mouseMode, controller]);

  return (
    <AppView appName={AppName} appLogo={Logo}>
      <div className="h-full w-full flex flex-col-reverse md:flex-row gap-4 mt-12">
        <TrussOptControl
          mouseMode={mouseMode}
          changeMouseMode={setMouseMode}
          onMeshWidthChange={setMeshWidth}
          onMeshHeightChange={setMeshHeight}
          onCellSizeChange={setCellSize}
          onLatticeTypeChange={setLatticeType}
          onOptimize={optimize}
          onClearOptimize={clearOptimize}
          onSimulate={simulate}
          onClearSimulate={clearSimulate}
          onNumIterationChange={setNumIterations}
          onTargetFunctionChange={setTargetFraction}
          numIterations={numIterations}
          targetFraction={targetFraction}
          meshWidth={meshWidth}
          meshHeight={meshHeight}
          cellSize={cellSize}
          showSimulationResult={controller.feaEngine !== null}
        />
        <TrussOptOutput
          controller={controller}
          canvasLoading={canvasLoading}
          simResult={simResult}
          optimizeMesh={optimizeMesh}
        />
      </div>
    </AppView>
  );
};

const AppName = "TrussOpt";

class TrussOpt extends ToolInfo {
  constructor() {
    super({
      id: "trussopt",
      name: AppName,
      description: "create + analyze + optimize your truss",
      cover: Logo,
      componentConstructor: () => <TrussOptView />,
    });
  }
}

export default TrussOpt;
