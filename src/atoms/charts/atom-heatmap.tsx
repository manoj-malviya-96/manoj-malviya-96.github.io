import React from 'react';
import ReactECharts from 'echarts-for-react';
import {useTheme} from "../../providers/theme";
import {adjustColor} from "../../common/color-utils";


interface HeatmapData {
	x: string[];
	y: string[];
	z: number[][];
	unit?: string;
	width?: ChartDimension;
	height?: ChartDimension;
	colorscale?: string[];
	title?: string;
	xTitle?: string;
	yTitle?: string;
}

export const AtomHeatmapChart: React.FC<HeatmapData> = React.memo(({
	                                                                   x,
	                                                                   y,
	                                                                   z,
	                                                                   unit,
	                                                                   width,
	                                                                   height,
	                                                                   colorscale,
	                                                                   title,
	                                                                   xTitle,
	                                                                   yTitle
                                                                   }) => {
	const {daisyNeutral, daisyPrimaryText} = useTheme();
	const options = {
		title: title ? {text: title, left: 'center', textStyle: {color: daisyPrimaryText}} : undefined,
		tooltip: {
			formatter: (params: any) =>
				`${x[params.value[0]]}, ${y[params.value[1]]}: ${params.value[2]} ${unit ? unit : ''}`,
		},
		backgroundColor: 'transparent',
		grid: {
			bottom: '20%',
			top: '10%'
		},
		xAxis: {
			type: 'category',
			data: x,
			splitArea: {
				show: true
			},
			axisLabel: {
				color: daisyPrimaryText
			},
			name: xTitle || undefined,
			nameLocation: 'center',
			nameGap: 30,
			nameTextStyle: {
				color: daisyPrimaryText
			}
		},
		yAxis: {
			type: 'category',
			data: y,
			splitArea: {
				show: true
			},
			axisLabel: {
				left: 'center',
				color: daisyPrimaryText
			},
			nameLocation: 'center',
			nameGap: 30,
			name: yTitle || undefined,
			nameTextStyle: {
				color: daisyPrimaryText
			}
		},
		visualMap: {
			show: false,
			min: 0,
			max: Math.max(...z.flat(), 0),
			calculable: false,
			orient: 'vertical',
			left: 'left',
			type: 'piecewise',
			inRange: {
				color: colorscale || [adjustColor(daisyNeutral, 0.2), '#00dc2c']
			},
			textStyle: {
				color: daisyPrimaryText
			}
		},
		series: [
			{
				name: 'Heatmap',
				type: 'heatmap',
				data: z.map((row, rowIndex) =>
					row.map((value, colIndex) => [colIndex, rowIndex, value])
				).flat(),
				label: {
					show: true
				},
				emphasis: {
					itemStyle: {
						borderColor: daisyPrimaryText,
						borderWidth: 1
					}
				},
				progressive: 1000,
				animation: true
			}
		]
	};
	
	return (
		<ReactECharts
			option={options}
			lazyUpdate={true}
			style={{
				width: width ? width : '100%',
				padding: 0,
				margin: 0,
				height: height ? height : '400px'
			}}
		/>
	);
});

export default AtomHeatmapChart;
