import React, { useEffect, useState } from "react";
import { AtomColumn } from "../../../atoms/atom-layout";
import AtomLineChart, { LineData } from "../../../atoms/charts/atom-line-chart";
import {
  AnalyzerBufferSize,
  AudioFeatures,
  AudioPlayerProps,
  FeaturesToExtract,
} from "../../../common/audio";
import Meyda, { MeydaAudioFeature } from "meyda";
import AtomButton, { ButtonSeverity } from "../../../atoms/atom-button";
import { AtomLoader } from "../../../atoms/atom-loader";
import { useToast } from "../../../providers/toasts";
import { ToastSeverity } from "../../../atoms/atom-toast";
import { roundTo } from "../../../common/math";

interface MuvizAnalyzeProps {
  src: AudioPlayerProps["src"];
  className?: string;
}

async function computeAllFeatures(
  src: string,
): Promise<{ features: AudioFeatures[]; sampleRate: number }> {
  try {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    const features: AudioFeatures[] = [];

    // Use original analyzer buffer size for Meyda compatibility
    const bufferSize = AnalyzerBufferSize;
    let previousBuffer: Float32Array | undefined = undefined;
    let position = 0;

    // Process in async batches
    while (position < channelData.length) {
      const remaining = channelData.length - position;
      const processSize = Math.min(bufferSize, remaining);
      const slice = channelData.subarray(position, position + processSize);

      // Pad if needed
      const buffer =
        processSize < bufferSize
          ? new Float32Array(bufferSize).map((_, i) => slice[i] || 0)
          : slice;

      // Extract features
      const feature = Meyda.extract(
        FeaturesToExtract as MeydaAudioFeature[],
        buffer,
        previousBuffer,
      ) as AudioFeatures;

      features.push(feature);
      previousBuffer = buffer;
      position += bufferSize;

      // Yield to event loop every 1000 chunks
      if (position % (bufferSize * 1000) === 0) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }

    await audioContext.close();
    return { features, sampleRate };
  } catch (error) {
    throw new Error(`Feature computation failed: ${error}`);
  }
}

const MuvizAnalyzer: React.FC<MuvizAnalyzeProps> = ({ src, className }) => {
  const [computing, setComputing] = useState(false);
  const { addToast } = useToast();
  const [chartData, setChartData] = useState<LineData[] | null>(null);
  const [timePoints, setTimePoints] = useState<number[]>([]);

  useEffect(() => {
    if (!computing) {
      return;
    }
    if (!src) {
      addToast("No audio source provided", ToastSeverity.Error);
      return;
    }
    computeAllFeatures(src)
      .then((result) => {
        const { features, sampleRate } = result;
        // Convert features to chart data
        const time = features.map((_, i) =>
          roundTo((i * AnalyzerBufferSize) / sampleRate, 2),
        );

        const datasets = FeaturesToExtract.map((feature) => {
          const values = features.map((f) => f[feature as keyof AudioFeatures]);
          return { name: feature, values };
        });

        setTimePoints(time);
        setChartData(datasets);
      })
      .catch((error) => {
        addToast(`Feature computation failed: ${error}`, ToastSeverity.Error);
      })
      .finally(() => {
        setComputing(false);
      });

    return () => {
      setComputing(false);
    };
  }, [src, computing, addToast]);

  return (
    <AtomColumn className={className}>
      {computing && <AtomLoader className={"w-56 h-56"} />}
      {chartData && !computing && (
        <AtomLineChart
          data={chartData}
          xAxisData={timePoints}
          height={320}
          xAxisLabel="Time (seconds)"
          yAxisLabel="Feature Value"
          colors={["#f1411b", "#ae07e6", "#FFA500", "#4CAF50", "#00BFFF"]}
        />
      )}
      <AtomButton
        onClick={() => setComputing(true)}
        label={"Compute"}
        icon={"fa-solid fa-play"}
        disabled={!src || computing}
        severity={ButtonSeverity.Info}
      />
    </AtomColumn>
  );
};
export default MuvizAnalyzer;
