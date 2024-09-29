/* ------ Helper functions ------ */
const timeOut_ms = 690; // Global Timeout

function loadContentWithOverlay(page, placeholder, overlay = null, callback = null, delay_ms = timeOut_ms) {
    const toggleDisplay = (element, displayStyle) => {
        if (element) element.style.display = displayStyle;
    };

    toggleDisplay(overlay, 'flex');
    toggleDisplay(placeholder, 'none');

    fetch(page)
        .then(response => response.ok ? response.text() : Promise.reject('Failed to load'))
        .then(data => {
            placeholder.innerHTML = data;
            setTimeout(() => {
                toggleDisplay(overlay, 'none');
                toggleDisplay(placeholder, 'block');
                callback?.(); // Call the callback if provided
            }, delay_ms);
        })
        .catch(error => {
            console.error('Error loading content:', error);
            toggleDisplay(overlay, 'none');
            placeholder.innerHTML = '<p>Error loading content. Please try again later.</p>';
            toggleDisplay(placeholder, 'block');
        });
}

// Overloaded function with no overlay and no delay
function loadContent(page, placeholder, callback = null) {
    loadContentWithOverlay(page, placeholder, null, callback, 0);
}

// Function to update the URL with a new pageName parameter
function addParamsToURL(params) {
    const url = new URL(window.location);
    for (const key in params) {
        url.searchParams.set(key, params[key]);
    }
    return url;
}

function getURLParams(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}
function storeValueInStorage(key, value) {
    localStorage.setItem(key, value);
}

function getValueFromStorage(key, defaultValue) {
    return localStorage.getItem(key) || defaultValue;
}

const months = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5,
    'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10,
    'Nov': 11, 'Dec': 12
};
function fromTxtMonth(month) {
    return months[month] || 0;
}

function parseDate(dateString) {
    const [month, day, year] = dateString.split(' ');
    return year * 10000 + fromTxtMonth(month) * 100 + parseInt(day.replace(',', ''));
}


// Utility function to query a selector and get its attribute or text content
function getElementAttribute(doc, selector, attr = 'textContent', defaultValue = '') {
    const element = doc.querySelector(selector);
    return element ? (attr === 'textContent' ? element.textContent : element.getAttribute(attr)) : defaultValue;
}

// Utility to create layout for Plotly plots
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

// Utility function to create a heatmap plot using Plotly
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
