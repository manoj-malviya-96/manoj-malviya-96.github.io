/* ------------ Helper functions ------------ */
const timeOut_ms = 369; // Global Timeout
const appWindowWidth = getSizeFromStyle("--app-window-width");
const appWindowHeight = getSizeFromStyle("--app-window-height");

const hideHeightClass = "hide-height";
const hideWidthClass = "hide-width";

// Format the date as "Month Day" (e.g., "Sep 20")
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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

async function runAsync(task) {
  if (!task) {
    return;
  }
  try {
    await task(); // Waits for the callback promise to resolve
  } catch (error) {
    console.error("Error in callback:", error);
    // Handle error if needed
  }
}

/* ------------ Content Loading ------------ */
function loadContentWithOverlay(
  page,
  placeholder,
  overlay = null,
  callback = null,
) {
  const toggleOverlay = (showOverlay = false) => {
    if (overlay) {
      toggleElementVisibility(
        overlay,
        showOverlay ? elementState.SHOW : elementState.HIDE,
      );
    }
    toggleElementVisibility(
      placeholder,
      showOverlay ? elementState.HIDE : elementState.SHOW,
    );
  };
  toggleOverlay(true);

  fetch(page)
    .then((response) =>
      response.ok ? response.text() : Promise.reject("Failed to load"),
    )
    .then((data) => {
      placeholder.innerHTML = data;
      runWithDelay(() => {
        toggleOverlay(false);
        callback?.(); // Call the callback if provided
      });
    })
    .catch((error) => {
      console.error("Error loading content:", error);
      placeholder.innerHTML =
        "<p>Error loading content. Please try again later.</p>";
      toggleOverlay(false);
    });
}

// Overloaded function with no overlay and no delay
function loadContent(page, placeholder, callback = null) {
  loadContentWithOverlay(page, placeholder, null, callback);
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

function doScrollInViewAnimation(element, timeout_ms) {
  element.classList.add("scroll-in-view-state");
  setTimeout(() => {
    element.classList.remove("scroll-in-view-state");
  }, timeout_ms);
}

function scrollElementInView(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const centerPosition = elementTop - window.innerHeight / 9;

    // Smoothly scroll the page to the calculated center position
    window.scrollTo({
      top: centerPosition,
      behavior: "smooth",
    });
    doScrollInViewAnimation(element, 1000);
  } else {
    console.error("Element not found:", elementId);
  }
}

function emitEvent(eventName, data) {
  const event = new CustomEvent(
    eventName,
    data !== null ? { detail: data } : null,
  );
  window.document.dispatchEvent(event);
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
  const propertyFromBody = getComputedStyle(
    window.document.body,
  ).getPropertyValue(property);
  if (propertyFromBody !== "") {
    return propertyFromBody;
  }
  return getComputedStyle(window.document.documentElement).getPropertyValue(
    property,
  );
}

function getSizeFromStyle(property) {
  return Number(getStyleValue(property).replace("px", ""));
}

const brandColor = getStyleValue("--color-brand");

function getContrastColor() {
  return getStyleValue("--color-primary");
}

function getPrimaryColorScale(numStops) {
  const lastColor = getContrastColor();
  let result = [[0, lastColor]];
  for (let i = 1; i <= numStops; i += 1) {
    const intensity = i / numStops;
    result.push([intensity, adjustColor(brandColor, 1, intensity)]);
  }
  return result;
}

const possibleRandomColors = [
  `rgb(251, 224, 224)`,
  `rgb(238, 253, 238)`,
  `rgb(163, 213, 255)`,
  `rgb(228, 24, 24)`,
  `rgb(17, 77, 205)`,
];

const whiteColor = `rgb(255, 255, 255)`; // White color

function randomColor() {
  const randomInt = Math.floor(Math.random() * possibleRandomColors.length);
  return possibleRandomColors[randomInt];
}

function getContinuousScaleColor(value, topColor, bottomColor, midColor) {
  const posColor = parseColor(topColor); // Green for positive
  const negColor = parseColor(bottomColor); // Red for negative
  const neutralColor = parseColor(midColor); // Neutral color

  // Clamp value between 0 and 1
  const clampedValue = Math.min(Math.max(value, 0), 1);

  // Determine interpolation factor `t` based on value position
  const t =
    clampedValue < 0.5 ? clampedValue / 0.5 : (clampedValue - 0.5) / 0.5;

  // Select the appropriate colors for interpolation
  const startColor = clampedValue < 0.5 ? negColor : neutralColor;
  const endColor = clampedValue < 0.5 ? neutralColor : posColor;

  // Interpolate between startColor and endColor
  const r = startColor.r + t * (endColor.r - startColor.r);
  const g = startColor.g + t * (endColor.g - startColor.g);
  const b = startColor.b + t * (endColor.b - startColor.b);
  const a = startColor.a + t * (endColor.a - startColor.a);

  // Return interpolated color as rgba string
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(2)})`;
}

// Helper function to parse color string (e.g., rgba(255, 255, 255, 0.5) or hex) into {r, g, b, a}
function parseColor(color) {
  const rgbaMatch = color.match(/rgba?\((\d+), (\d+), (\d+),?\s?(\d?.?\d+)?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1, // Default alpha to 1 if not provided
    };
  }

  // If color is in hex, parse it to RGB (ignores alpha for simplicity)
  const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
      a: 1, // Default alpha to 1
    };
  }

  throw new Error("Invalid color format");
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

function internal_setupDropdown(
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

    const newIcon = event.target.getAttribute("data-icon");
    if (newIcon) {
      icon.className = newIcon;
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
  addOutsideClickHandler(button, dropdown);
}

function setupDropdown(dropdownContainer, callback = null) {
  if (
    !dropdownContainer &&
    !dropdownContainer.classList.contains("modern-dropdown-container")
  ) {
    console.error("Dropdown container invalid");
    return;
  }

  const button = dropdownContainer.querySelector(".primary-button");
  const dropdown = dropdownContainer.querySelector(".modern-dropdown-list");
  const selectedValue = button.querySelector(".button-label");
  const icon = button.querySelector("i");

  internal_setupDropdown(button, dropdown, callback, selectedValue, icon);
}

function setupSpinbox(spinbox, onChangeCallback = null) {
  if (!spinbox) {
    console.error("Spinbox element not found");
    return;
  }

  const input = spinbox.querySelector("input");
  if (input.type !== "text") {
    console.error("Input type must be text");
    return;
  }

  const maxValue = Number(input.getAttribute("max")) || 10000;
  const minValue = Number(input.getAttribute("min")) || -10000;
  const stepSize = Number(input.getAttribute("step")) || 1;

  const incrementBtn = spinbox.querySelector(".modern-spinbox-btn-up");
  const decrementBtn = spinbox.querySelector(".modern-spinbox-btn-down");

  if (!incrementBtn || !decrementBtn) {
    console.error("Increment and decrement buttons not found");
    return;
  }

  const handleChange = (newValue) => {
    if (newValue > maxValue || newValue < minValue) {
      return;
    }
    input.value = newValue;
    onChangeCallback?.(newValue);
  };

  const handleIncrement = () => {
    const newValue = Number(input.value) + stepSize;
    handleChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Number(input.value) - stepSize;
    handleChange(newValue);
  };

  incrementBtn.addEventListener("click", handleIncrement);
  decrementBtn.addEventListener("click", handleDecrement);

  input.addEventListener("input", () => {
    let value = parseInt(input.value, 10);
    handleChange(value);
  });
}

function setupAllSpinBoxsWithOneCallback(callback = null) {
  const spinBoxList = document.querySelectorAll(".modern-spinbox");
  spinBoxList.forEach((spinbox) => {
    setupSpinbox(spinbox, callback);
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

function addKeyValueToTable(table, key, value) {
  const row = table.insertRow();
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  cell1.textContent = key;
  cell2.textContent = value;
}

function addOutsideClickHandler(button, popup) {
  window.addEventListener("click", (event) => {
    if (!button.contains(event.target) && !popup.contains(event.target)) {
      popup.classList.add("hidden");
    }
  });
}

const socialMediaLinks = {
  Linkedin: "https://www.linkedin.com/in/manoj-malviya-44700aa4/",
  GitHub: "https://github.com/manoj-malviya-96",
  Instagram: "https://www.instagram.com/manoj_malviya_/",
  YouTube: "https://www.youtube.com/@manoj_malviya_",
  Spotify:
    "https://open.spotify.com/artist/2oq6u1YZ7biOF4NOPwDp8o?si=ijyL-yRWQqGWqdGIr7Irfg&utm_medium=share&utm_source=linktree&nd=1&dlsi=1234682c3e064aaf",
  Apple: "https://music.apple.com/us/artist/manoj-malviya/1721435458",
  SoundCloud: "https://soundcloud.com/manoj-malviya-96",
  MixCloud: "https://www.mixcloud.com/manoj-malviya/",
  Scholar:
    "https://scholar.google.com/citations?user=0oMXOy0AAAAJ&hl=en&authuser=2",
};

function loadSocialMediaLink(identifier, event) {
  event.stopPropagation();
  event.preventDefault();

  if (socialMediaLinks[identifier]) {
    window.location.href = socialMediaLinks[identifier];
  } else {
    console.error("Link not found for identifier:", identifier);
  }
}

function bringElementToFocus(elementId) {
  const element = window.document.getElementById(elementId);
  element.focus({ preventScroll: false });
}

/* ------------ Button Utilities ------------ */
function isPrimaryButtonSelected(button) {
  return button.classList.contains("selected");
}

function togglePrimaryButton(button, forceSelect = false) {
  if (button.classList.contains("selected") && !forceSelect) {
    button.classList.remove("selected");
  } else {
    deselectAllButtons(); // Make sure only one button is selected
    button.classList.add("selected");
  }
}

function deselectAllButtons() {
  const buttons = window.document.querySelectorAll(".primary-button.selected");
  buttons.forEach((button) => button.classList.remove("selected"));
}

function runALoopTask(task_func, args, progressBar) {
  if (!task_func) {
    console.error("Task not provided");
    return;
  }
  if (!args) {
    console.error("Arguments not provided");
    return;
  }
  if (!progressBar) {
    console.error("Progress bar container not provided");
    return;
  }

  const totalTasks = args.length;

  const updateProgress = (index) => {
    progressBar.value = ((index + 1) / totalTasks) * 100;
  };

  let result = [];
  args.forEach((arg, index) => {
    result[index] = task_func(arg);
    updateProgress(index);
  });
  return result;
}

const elementState = Object.freeze({
  SHOW: 0,
  HIDE: 1,
  TOGGLE: 2,
});
const transitionDefault_ms = 1000 * getSizeFromStyle("--transition-default");

function toggleElementVisibility(element, state = elementState.TOGGLE) {
  if (!element) {
    console.error("Element not found");
  }

  const isAlreadyHidden = element.classList.contains("hidden");
  if (state === elementState.SHOW && !isAlreadyHidden) {
    return; // No need to show if already visible
  }
  if (state === elementState.HIDE && isAlreadyHidden) {
    return; // No need to hide if already hidden
  }

  const displayToggle = () => {
    switch (state) {
      case elementState.SHOW:
        element.classList.remove("hidden");
        break;
      case elementState.HIDE:
        element.classList.add("hidden");
        break;
      case elementState.TOGGLE:
        element.classList.toggle("hidden");
        break;
      default:
        console.error("Invalid element visibility option");
    }
  };

  displayToggle();
}
