const textColor = getStyleValue("--color-white");
const backgroundColor = getStyleValue("--color-black");
const regFontSize = Number(getStyleValue("--regular-text-size"));
const subtitleFontSize = Number(getStyleValue("--subtitle-text-size"));

/* ------------ Plotly Utilities ------------ */
function createLayout(
  width,
  height,
  title,
  xTitle,
  yTitle,
  showTickLabels = true,
) {
  const margin = showTickLabels ? 100 : 0;
  return {
    title: {
      text: title,
      font: {
        size: Number(getStyleValue("--title-text-size")),
        color: textColor,
      },
    },
    xaxis: {
      title: {
        text: xTitle,
        font: {
          size: regFontSize,
          color: textColor,
        },
      },
      tickfont: {
        size: subtitleFontSize,
        color: textColor,
      },
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: showTickLabels,
    },
    yaxis: {
      title: {
        text: yTitle,
        font: {
          size: regFontSize, // Set Y-axis title font size
          color: textColor,
        },
      },
      tickfont: {
        size: subtitleFontSize,
        color: textColor,
      },
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: showTickLabels,
    },
    padding: 0,
    margin: { t: margin, l: margin, r: margin, b: margin },
    autosize: true,
    width: width,
    height: height,
    paper_bgcolor: backgroundColor,
    plot_bgcolor: backgroundColor,
  };
}

function getColorBar(text) {
  return {
    title: {
      text: text,
      font: {
        size: regFontSize,
        color: textColor,
      },
    },
    ticks: "outside",
    tickfont: {
      size: subtitleFontSize,
      color: textColor,
    },
    thickness: 10,
  };
}

function getHackyHeightMultiplier(xLength, yLength) {
  let result = yLength / xLength;
  if (result < 1.0 && result > 0.3) {
    result = Math.min(1.0, result + 0.2); // Accounting for other elements
  }
  return result;
}

function createHeatmap(
  containerId,
  x,
  y,
  z,
  max_width = 600,
  title = "",
  xTitle = "",
  yTitle = "",
  minimalisticView = false,
) {
  const data = {
    z: z,
    x: x,
    y: y,
    type: "heatmap",
    xgap: 1,
    ygap: 1,
    colorscale: getPrimaryColorScale(5),
    colorbar: getColorBar("Probability"),
  };

  const width = max_width;
  const height = Math.ceil(
    width * getHackyHeightMultiplier(x.length, y.length),
  ); // Maintain aspect ratio

  createHeatmapFromTrace(
    containerId,
    data,
    width,
    height,
    title,
    xTitle,
    yTitle,
    minimalisticView,
  );
}

function createHeatmapFromTrace(
  containerId,
  data,
  width,
  height,
  title = "",
  xTitle = "",
  yTitle = "",
  minimalisticView = false,
) {
  if (!data.type || data.type !== "heatmap") {
    console.error("Invalid trace data for heatmap");
  }
  const showTickLabels = !minimalisticView;
  Plotly.newPlot(
    containerId,
    [data],
    createLayout(width, height, title, xTitle, yTitle, showTickLabels),
  );
}
