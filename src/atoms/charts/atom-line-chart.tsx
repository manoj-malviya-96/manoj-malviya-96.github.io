import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useTheme } from "../../providers/theme";

// Register required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
]);

export type LineData = {
  name: string;
  values: number[];
};

export interface LineChartProps {
  data: Array<LineData>;
  // X-axis labels/categories
  xAxisData: (string | number)[];
  height?: number;
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  // Color for lines
  colors?: string | string[];
  // Show legend (default: true)
  legend?: boolean;
}

export const AtomLineChart: React.FC<LineChartProps> = ({
  data,
  xAxisData,
  height = 400,
  title,
  xAxisLabel,
  yAxisLabel,
  colors = "#5470c6",
  legend = true,
}) => {
  const { daisyPrimaryText } = useTheme();

  const option = {
    animation: false,
    title: {
      text: title,
      left: "center",
      textStyle: {
        color: daisyPrimaryText,
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      confine: true,
      appendToBody: false,
    },
    legend: {
      show: legend,
      data: data.map((series) => series.name),
      top: legend ? "top" : undefined,
      textStyle: {
        color: daisyPrimaryText,
      },
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      name: xAxisLabel,
      nameLocation: "middle",
      nameGap: 30,
      axisLine: {
        lineStyle: {
          color: daisyPrimaryText,
        },
      },
      axisLabel: {
        color: daisyPrimaryText,
      },
      nameTextStyle: {
        color: daisyPrimaryText,
      },
    },
    yAxis: {
      type: "value",
      name: yAxisLabel,
      axisLine: {
        lineStyle: {
          color: daisyPrimaryText,
        },
      },
      axisLabel: {
        color: daisyPrimaryText,
      },
      nameTextStyle: {
        color: daisyPrimaryText,
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: daisyPrimaryText,
        },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "12%",
      containLabel: true,
    },
    series: data.map((series, index) => ({
      name: series.name,
      type: "line",
      data: series.values,
      smooth: false,
      symbol: "none",
      lineStyle: {
        width: 2,
        color: Array.isArray(colors) ? colors[index % colors.length] : colors,
      },
    })),
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: "100%" }}
      notMerge={true}
      key={JSON.stringify({ data, xAxisData, daisyPrimaryText })}
      opts={{ renderer: "canvas", devicePixelRatio: 1 }}
    />
  );
};
export default AtomLineChart;
