/* ------ Helper functions ------ */

function storeValueInStorage(key, value) {
    localStorage.setItem(key, value);
}

function getValueFromStorage(key, defaultValue) {
    return localStorage.getItem(key) || defaultValue;
}

function fromTxtMonth(month) {
    const months = {
        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5,
        'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10,
        'Nov': 11, 'Dec': 12
    };
    return months[month] || 0;
}

function parseDate(dateString) {
    const [month, day, year] = dateString.split(' ');
    return year * 10000 + fromTxtMonth(month) * 100 + parseInt(day.replace(',', ''));
}


function getIdTextContent(doc, id, defaultValue = '') {
    return doc.querySelector(id) ? doc.querySelector(id).textContent : defaultValue;
}


function createLayout(title, xTitle, yTitle) {
    return {
        title: title,
        xaxis: {
            title: xTitle,
            automargin: true,
            showgrid: false
        },
        yaxis: {
            title: yTitle,
            automargin: true,
            showgrid: false
        },
        width: 500,
        height: 400,
        autosize: false,
        paper_bgcolor: 'rgba(0,0,0,0)', // Makes the overall plot background transparent
        plot_bgcolor: 'rgba(0,0,0,0)'   // Makes the area where data is plotted transparent
    };
}

function createHeatmap(containerId, x, y, z, title = "", xTitle = "", yTitle = "") {
    const data = {
        z: z,
        x: x,
        y: y,
        type: 'heatmap',
        colorscale: 'Jet',
        colorbar: {
            ticks: 'outside',
            title: 'Probability'
        }
    };
    Plotly.newPlot(containerId, [data], createLayout(title, xTitle, yTitle));
}
