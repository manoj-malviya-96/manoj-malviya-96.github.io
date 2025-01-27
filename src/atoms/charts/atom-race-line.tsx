import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useTheme } from "../../providers/theme";

echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  LabelLayout,
  UniversalTransition,
]);

export interface RaceLineData {
  label: string;
  data: number[];
}

interface RaceLinePlot {
  data: RaceLineData[];
  time: number[];
  height?: number;
  legend?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  mainColor?: string;
}

const AtomRaceLineChart: React.FC<RaceLinePlot> = ({
  data,
  time,
  height = 500,
  legend,
  mainColor,
  xAxisLabel = "Year",
  yAxisLabel = "Value",
}) => {
  const { daisyPrimaryText } = useTheme();

  // Transform data into array format for dimensions
  const datasetSource = data.flatMap((series) =>
    time.map((t, index) => [t, series.data[index], series.label]),
  );

  // Generate dataset filters - one for each series
  const datasetWithFilters = data.map((series) => ({
    id: `dataset_${series.label}`,
    fromDatasetId: "dataset_raw",
    transform: {
      type: "filter",
      config: {
        and: [
          { dimension: 0, gte: Math.min(...time) },
          { dimension: 2, "=": series.label },
        ],
      },
    },
  }));

  // Generate series configuration
  const seriesList = data.map((series) => ({
    type: "line",
    datasetId: `dataset_${series.label}`,
    showSymbol: false,
    name: series.label,
    labelLayout: {
      moveOverlap: "shiftY",
      hideOverlap: true,
    },
    emphasis: {
      focus: "series",
    },
    encode: {
      x: 0, // Use dimension 0 (time) for x-axis
      y: 1, // Use dimension 1 (value) for y-axis
      itemName: 0, // Use time for item names
      tooltip: [1], // Show value in tooltip
      label: [2], // Use category label
    },
    lineStyle: {
      width: 3,
      color: mainColor || "red",
    },
  }));

  const option = {
    animation: true,
    animationDuration: 4700,
    dataset: [
      {
        id: "dataset_raw",
        source: datasetSource,
      },
      ...datasetWithFilters,
    ],
    title: {
      text: legend,
      left: "center",
      top: 10,
      textStyle: {
        fontSize: 14,
      },
    },
    tooltip: {
      order: "valueDesc",
      trigger: "axis",
      confine: true,
    },
    xAxis: {
      type: "category",
      name: xAxisLabel,
      nameLocation: "middle",
      nameGap: 30,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        margin: 10,
      },
      textStyle: {
        color: daisyPrimaryText,
      },
    },
    yAxis: {
      name: yAxisLabel,
      scale: true,
      nameTextStyle: {
        padding: [0, 0, 0, 10],
        color: daisyPrimaryText,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        margin: 6,
      },
      color: daisyPrimaryText,
    },
    grid: {
      top: 47,
      bottom: 20,
      left: 30,
      right: 30,
      containLabel: true,
    },
    series: seriesList,
  };
  return (
    <ReactECharts
      option={option}
      key={JSON.stringify({ data, time })}
      style={{
        height: `${height}px`,
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export default AtomRaceLineChart;
