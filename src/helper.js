/* ------------ Helper functions ------------ */
const timeOut_ms = 369; // Global Timeout

function runWithDelay(callback, delay_ms = timeOut_ms, single_arg = null) {
  if (!callback) {
    console.error("Callback function not provided");
    return;
  }
  if (single_arg === null) {
    setTimeout(callback, delay_ms);
    return;
  }
  const run = () => callback(single_arg);
  setTimeout(run, delay_ms);
}

/* ------------ Content Loading ------------ */
function loadContentWithOverlay(
  page,
  placeholder,
  overlay = null,
  callback = null,
) {
  const toggleDisplay = (element, displayStyle) => {
    if (element) element.style.display = displayStyle;
  };

  toggleDisplay(overlay, "flex");
  toggleDisplay(placeholder, "none");

  fetch(page)
    .then((response) =>
      response.ok ? response.text() : Promise.reject("Failed to load"),
    )
    .then((data) => {
      placeholder.innerHTML = data;
      runWithDelay(() => {
        toggleDisplay(overlay, "none");
        toggleDisplay(placeholder, "block");
        callback?.(); // Call the callback if provided
      });
    })
    .catch((error) => {
      console.error("Error loading content:", error);
      toggleDisplay(overlay, "none");
      placeholder.innerHTML =
        "<p>Error loading content. Please try again later.</p>";
      toggleDisplay(placeholder, "block");
    });
}

// Overloaded function with no overlay and no delay
function loadContent(page, placeholder, callback = null) {
  loadContentWithOverlay(page, placeholder, null, callback, 0);
}

/* ------------ URL and Storage ------------ */
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

/* ------------ Date Parsing ------------ */
const months = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

function fromTxtMonth(month) {
  return months[month] || 0;
}

function parseDate(dateString) {
  const [month, day, year] = dateString.split(" ");
  return (
    year * 10000 + fromTxtMonth(month) * 100 + parseInt(day.replace(",", ""))
  );
}

/* ------------ DOM Utilities ------------ */
function getElementAttribute(
  doc,
  selector,
  attr = "textContent",
  defaultValue = "",
) {
  const element = doc.querySelector(selector);
  return element
    ? attr === "textContent"
      ? element.textContent
      : element.getAttribute(attr)
    : defaultValue;
}

function scrollElementInView(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center", // This ensures the element scrolls into the center of the page
    });
  } else {
    console.error("Element not found:", elementId);
  }
}

/* ------------ Color Utilities ------------ */
function adjustColor(color, opacity = 1, brightness = 1) {
  // Extract RGB values from the input color string (assumes 'rgb(r, g, b)' format)
  let [r, g, b] = color.match(/\d+/g).map(Number);

  // Adjust brightness by multiplying each RGB component
  r = Math.min(255, r * brightness);
  g = Math.min(255, g * brightness);
  b = Math.min(255, b * brightness);

  // Return the modified color as 'rgba(r, g, b, opacity)'
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function hexToRgb(hex) {
  if (!hex) {
    return "0,0,0"; // Fallback to black if color is undefined
  }
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
}

/* ------------ Style Utilities ------------ */
function getStyleValue(property) {
  return getComputedStyle(window.document.documentElement).getPropertyValue(
    property,
  );
}

function getPrimaryColor() {
  return getStyleValue("--color-brand-primary");
}

function getPassiveColor() {
  return getStyleValue("--color-passive-element");
}

function getPrimaryColorScale(numStops) {
  const primaryColor = getPrimaryColor();
  const lastColor = getPassiveColor();
  let result = [[0, lastColor]];
  for (let i = 1; i <= numStops; i += 1) {
    const intensity = i / numStops;
    result.push([intensity, adjustColor(primaryColor, 1, intensity)]);
  }
  return result;
}

/* ------------ Dropdown Utilities ------------ */
function createDropdownItem(dataValue, dataLabel, dataIcon) {
  let item = document.createElement("li");
  item.setAttribute("data-value", dataValue);
  if (dataIcon) {
    item.setAttribute("data-icon", dataIcon);
  }
  item.textContent = dataLabel;
  item.className = "modern-dropdown-item";
  return item;
}

function setupDropdown(
  button,
  dropdown,
  callback = null,
  selected_value = null,
  icon = null,
) {
  if (!dropdown || !button) {
    console.error("Dropdown elements not found");
    return;
  }

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    dropdown.classList.toggle("hidden");
  };

  // Add event listeners to the button
  button.addEventListener("click", toggleDropdown);

  const handleDropdownSelect = (event) => {
    const selectedValue = event.target.getAttribute("data-value");

    // Select the clicked item and deselect others
    dropdownItems.forEach((item) => item.classList.remove("selected"));
    event.target.classList.add("selected");

    // Run the callback function if provided
    if (callback) {
      callback(selectedValue);
    }

    if (icon) {
      const newIcon = event.target.getAttribute("data-icon");
      if (newIcon) {
        icon.className = newIcon;
      }
    }

    // Update the selected value in the button
    if (selected_value) {
      selected_value.textContent = event.target.textContent;
    }

    // Close the dropdown after selecting a category
    toggleDropdown();
  };

  // Setting up the dropdown items
  const dropdownItems = dropdown.querySelectorAll(".modern-dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => handleDropdownSelect(event));
  });

  // Close the dropdown when clicking outside
  window.addEventListener("click", (event) => {
    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.add("hidden");
    }
  });
}

/* ------------ PDF Loading ------------ */
function loadPDF(url, placeholder, overlay) {
  // Show the loading spinner
  overlay.style.display = "block";
  placeholder.style.display = "none";

  // Create a container div to center the iframe
  const iframeContainer = document.createElement("div");
  iframeContainer.style.display = "flex";
  iframeContainer.style.justifyContent = "center"; // Center horizontally
  iframeContainer.style.width = "100%"; // Ensure the container takes the full width

  // Create the iframe element
  const iframe = document.createElement("iframe");
  iframe.src = url; // Set the source to the PDF URL
  iframe.style.width = "69%";
  iframe.style.height = "100vh";
  iframe.style.borderRadius = "6px"; // Check Style.css for sync
  iframe.style.border = "none";

  // Append the iframe to the container
  iframeContainer.appendChild(iframe);

  // Remove any previous content and add the container with the iframe
  placeholder.innerHTML = "";
  placeholder.appendChild(iframeContainer);

  // Show the content and hide the spinner once the iframe is loaded
  iframe.onload = () => {
    overlay.style.display = "none";
    placeholder.style.display = "block";
  };

  // Handle iframe loading errors (optional)
  iframe.onerror = () => {
    overlay.style.display = "none";
    alert("Failed to load the PDF. Please try again.");
  };
}
