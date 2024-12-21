import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import {useTheme} from "../providers/theme";
import {roundTo} from "../common/math";

interface CalendarData {
    data: Record<string, number>; // {'yyyy-MM-dd': value}
    year: number;
    unit: string;
}

const dayTime = 24 * 3600 * 1000;
const _CalendarChart: React.FC<CalendarData> = ({data, year, unit}) => {
    const {daisyPrimary, daisyPrimaryText} = useTheme();
    
    
    const startDate = +echarts.time.parse(`${year}-01-01`); // Start of the year
    const endDate = +echarts.time.parse(`${year}-12-31`); // End of the year
    
    // Generate the complete date range and fill values (0 if missing)
    const result: [string, number][] = [];
    for (let date = startDate; date <= endDate; date += dayTime) {
        const key = echarts.time.format(date, '{yyyy}-{MM}-{dd}', false);
        result.push([key, data[key] || 0]);
    }
    
    const options = {
        tooltip: {
            formatter: (params: any) => `${params.value[0]}: ${params.value[1]}`,
        },
        backgroundColor: 'transparent',
        visualMap: {
            top: 20,
            min: 0,
            max: Math.max(...Object.values(data), 0),
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            text: ['High', 'Low'],
            formatter: (value: number) => `${roundTo(value, 0)} ${unit}`,
            inRange: {
                color: [daisyPrimary, '#00dc2c'],
            },
            textStyle: {
                color: daisyPrimaryText,
            },
            color: daisyPrimaryText,
        },
        calendar: {
            range: `${year}`,
            cellSize: ['auto', 20],
            top: 120,
            left: 30,
            right: 10,
            itemStyle: {
                color: 'transparent',
                borderWidth: 3,
                borderColor: 'transparent',
            },
            dayLabel: {
                color: daisyPrimaryText,
            },
            monthLabel: {
                color: daisyPrimaryText,
            },
            yearLabel: {
                show: false,
            },
            splitLine: {
                show: true, // Ensures separators are visible
                lineStyle: {
                    color: daisyPrimaryText,
                    width: 1,
                    opacity: 0.69,
                    type: 'dotted',
                },
            },
        },
        series: [
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: result,
            },
        ],
    };
    
    return <ReactECharts option={options}
                         lazyUpdate={true}
                         style={{
                             height: '400px'
                         }}/>;
};
export const CalendarChart = React.memo(_CalendarChart);