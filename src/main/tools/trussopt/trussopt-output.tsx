import AtomStyledContainer from "../../../atoms/atom-styled-container";
import { AtomCanvas } from "../../../atoms/canvas/atom-canvas";
import { AtomRow, LayoutSize } from "../../../atoms/atom-layout";
import AtomStats, { StatSeverity } from "../../../atoms/atom-stats";
import React from "react";
import { TrussStructureView } from "./truss-controller";
import { TrussFeaResults } from "./truss-fea";
import TrussMesh from "./truss-mesh";

interface TrussOptOutputProps {
  controller: TrussStructureView;
  canvasLoading: boolean;
  simResult: TrussFeaResults | null;
  optimizeMesh: TrussMesh | null;
}

const TrussOptOutput: React.FC<TrussOptOutputProps> = React.memo(
  ({ controller, canvasLoading, simResult, optimizeMesh }) => {
    return (
      <AtomStyledContainer
        label={"Output"}
        className={
          "w-full md:w-3/4 h-full inline-block relative overflow-hidden"
        }
        transparency={true}
        scrollable={false}
      >
        <AtomCanvas
          controller={controller}
          animationLoop={false}
          isLoading={canvasLoading}
          className="w-full h-full p-4"
        />

        <div
          className="absolute right-0 bottom-0 p-4
                                    z-5 bg-primary bg-opacity-80 backdrop-blur-lg"
        >
          <AtomRow size={LayoutSize.FullWidth}>
            <AtomStats
              className={"w-fit h-full"}
              text={"Volume"}
              value={simResult ? simResult.volume : "N/A"}
              severity={optimizeMesh ? StatSeverity.Info : StatSeverity.Primary}
            />
            <AtomStats
              className={"w-fit h-full"}
              text={"Energy"}
              value={simResult ? simResult.strainEnergy : "N/A"}
              severity={optimizeMesh ? StatSeverity.Info : StatSeverity.Primary}
            />
          </AtomRow>
        </div>
      </AtomStyledContainer>
    );
  },
);

export default TrussOptOutput;
