import Plot from "react-plotly.js";
import ScrollContainer from "./scroll-container";

function createLayout(
    width,
    height,
    title,
    xTitle,
    yTitle,
    minimalView = true,
    textColor = "#ffffff"
) {
    const margin = !minimalView ? 100 : 0;
    const backgroundColor = `rgba(0, 0, 0, 0)`;

    return {
        title: {
            text: title,
            font: {
                size: title !== "" ? 20 : 0,
                color: textColor,
            },
        },
        xaxis: {
            title: {
                text: xTitle,
                font: {
                    size: 20,
                    color: textColor,
                },
            },
            tickfont: {
                size: 10,
                color: textColor,
            },
            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: !minimalView,
            scaleratio: 1,
        },
        yaxis: {
            title: {
                text: yTitle,
                font: {
                    size: 20,
                    color: textColor,
                },
            },
            tickfont: {
                size: 10,
                color: textColor,
            },
            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: !minimalView,
            scaleanchor: "x",
            scaleratio: 1,
        },
        showlegend: false,
        margin: {t: margin, l: margin, r: margin, b: margin},
        autosize: true,
        paper_bgcolor: backgroundColor,
        plot_bgcolor: backgroundColor,
        hovermode: "closest",
    };
}

const Plotter = ({
                     dataTrace,
                     title = "",
                     xTitle = "",
                     yTitle = "",
                     height = "",
                     width = "",
                     textColor = "#ffffff",
                     minimalView = true
                 }) => {
    return (
        <ScrollContainer
            className="relative w-full h-full max-h-screen max-w-full rounded-md p-2"
            children={
                <Plot
                    data={dataTrace}
                    layout={createLayout(width, height, title, xTitle, yTitle, minimalView, textColor)}
                    config={{
                        displaylogo: false, // Removes the Plotly logo
                        responsive: true, // Ensures responsiveness
                    }}
                />
            }
        />
    );
}
export default Plotter;
