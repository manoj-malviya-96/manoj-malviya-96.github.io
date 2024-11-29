import Plot from 'react-plotly.js';

const HeatmapPlot = ({
                         data,
                         colorscale = ["#d6e685", "#8cc665", "#44a340", "#1e6823"], // Discrete colors
                         xLabels = [],
                         yLabels = [],
                         title = "",
                         height = 400,
                         width = 600,
                         textColor = "#ffffff",
                     }) => {
    return (
        <Plot
            data={[
                {
                    z: data, // 2D array of data values
                    x: xLabels, // Labels for the columns
                    y: yLabels, // Labels for the rows
                    type: "heatmap",
                    colorscale: colorscale.map((color, index) => [
                        index / (colorscale.length - 1),
                        color,
                    ]), // Map colors to discrete values
                    showscale: true, // Display the color scale
                },
            ]}
            layout={{
                title: {
                    text: title,
                    font: { size: 24, color: textColor },
                },
                xaxis: {
                    title: { text: "X Axis", font: { size: 16, color: textColor } },
                    tickfont: { size: 12, color: textColor },
                },
                yaxis: {
                    title: { text: "Y Axis", font: { size: 16, color: textColor } },
                    tickfont: { size: 12, color: textColor },
                },
                autosize: false,
                height: height, // Control the height of the heatmap
                width: width, // Control the width of the heatmap
                paper_bgcolor: "rgba(0,0,0,0)", // Transparent background
                plot_bgcolor: "rgba(0,0,0,0)", // Transparent plot area
                margin: { t: 40, l: 40, r: 40, b: 40 },
            }}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default HeatmapPlot;
