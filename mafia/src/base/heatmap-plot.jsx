import React from "react";
import Plot from "react-plotly.js";
import {getPrimaryColorForDaisy} from "../utils/color";

const CirclePlot = ({
                        data,
                        title = "",
                        radialTitle = "",
                        angularTitle = "",
                        markerSize = 10,
                        toTickLabels = (x) => x,
                    }) => {
    // Map days to angles (0° to 360°)
    const angles = data.map((_, i) => (i / data.length) * 360);
    const radii = data;

    // Dynamic color variables
    const primaryColor = getPrimaryColorForDaisy() || "#f63b4b"; // Fallback to blue
    const textColor = getPrimaryColorForDaisy() || "#ffffff"; // Fallback to gray

    const tickQs = [0, 45, 90, 135, 180, 225, 270, 315];
    const tickText = tickQs.map((q) => toTickLabels(q));

    return (
        <Plot
            data={[
                {
                    type: "scatterpolar",
                    r: radii,
                    theta: angles,
                    mode: "markers",
                    marker: {
                        size: markerSize,
                        color: radii,
                        colorscale: [
                            [0, primaryColor],
                            [1, primaryColor],
                        ], // Use DaisyUI's primary theme for colors
                        showscale: false,
                    },
                    hoverinfo: "r+theta", // Show radius (values) and angle (days)
                },
            ]}
            layout={{
                title: {
                    text: title,
                    font: { size: 28, color: textColor }, // Larger title font
                },
                polar: {
                    bgcolor: "rgba(0,0,0,0)", // Transparent inside the circle
                    radialaxis: {
                        title: { text: radialTitle, font: { size: 16, color: 'white' } },
                        tickfont: { size: 14, color: 'white' }, // Bigger tick font
                        showgrid: false,
                    },
                    angularaxis: {
                        title: { text: angularTitle, font: { size: 16, color: 'white' } },
                        tickfont: { size: 10, color: 'white' }, // Bigger tick font
                        showgrid: false,
                        tickmode: "array",
                        tickvals: tickQs,
                        ticktext: tickText,
                    },
                },
                hovermode: "closest",
                paper_bgcolor: "rgba(0,0,0,0)", // Transparent background
                plot_bgcolor: "rgba(0,0,0,0)", // Transparent background
                autosize: true,
                margin: { t: 0, l: 0, r: 0, b: 0 },
            }}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default CirclePlot;
