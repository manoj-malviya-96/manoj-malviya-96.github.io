/** Common utility functions for Quarto themes */

// Global variables - Accessible across all scripts
const contentPlaceholder = window.document.getElementById(
  "content-placeholder",
);
const contentPlaceholderOverlay = window.document.getElementById(
  "content-placeholder-overlay",
);

const homePage = "./home.html";
const homePageCallbacks = [
  initTheme,
  initGithub,
  setupSortOptions,
  loadApps,
  loadProjects,
];

const defaultProjectCallbacks = [
  initTheme,
  loadProjectFooter,
  initImageFluidHandler,
  initScrollTracking,
];
// Order matters- loadProjectFooter should be called before initScrollTracking
const projectHTMLToCallBackMap = {
  "./research/delta-design/delta-design.html": [createPlotsForDeltaDesign],
  "./research/topt/rapid-topt.html": [],
  "./research/cub-companion/cub-companion.html": [],
  "./research/dfam/dfam.html": [createPlotsForDfam],
  "./research/embed-am/embed-am.html": [],
  "./research/build-orient/build-orient.html": [],
  "./job/formlabs-ui/ui-lead.html": [],
  "./job/formlabs-supports/supports.html": [],
};
// App-specific callbacks
const defaultAppCallbacks = [initTheme];
const appHTMLToCallBackMap = {
  "./apps/music-viz/music-viz.html": [initMusicApp],
  "./apps/mesh-morph/mesh-morph.html": [initMeshMorph],
};

// Load Content with Overlay, used to show a loading spinner while content is being fetched
function loadContentInMainWindow(
  page,
  event,
  callbacks = [],
  doPushToHistory = true,
) {
  if (!contentPlaceholder || !contentPlaceholderOverlay) {
    console.error("Content placeholders not found");
    return;
  }

  loadContentWithOverlay(
    page,
    contentPlaceholder,
    contentPlaceholderOverlay,
    () => {
      handleRunningApps();
      if (callbacks.length > 0) {
        for (const callback of callbacks) {
          runWithDelay(callback, 5); // Add a delay to ensure the content is loaded before calling the callback
        }
      }
    },
  );
  handleURLinHistory(addParamsToURL({ pageName: page }), doPushToHistory);
  initContentObserver(contentPlaceholder);
}

/** We have three types of pages: home and project pages. */

// 1. Load the homepage content -> About me and project cards.
function loadHomePage(
  event = null,
  doPushToHistory = true,
  extraCallbacks = [],
) {
  const callbacks = homePageCallbacks.concat(extraCallbacks);
  loadContentInMainWindow(homePage, event, callbacks, doPushToHistory);
}

// 2. Load Project Page with the specified callbacks
function loadProjectPage(page, event, doPushToHistory = true) {
  const callbacks = defaultProjectCallbacks.concat(
    projectHTMLToCallBackMap[page],
  );
  loadContentInMainWindow(page, event, callbacks, doPushToHistory);
}

// 3. Load App Window with the specified callbacks
function loadApp(page, event, doPushToHistory = true) {
  const callbacks = defaultAppCallbacks.concat(appHTMLToCallBackMap[page]);
  loadContentInMainWindow(page, event, callbacks, doPushToHistory);
}

// Load the page from the URL with the 'pageName' parameter
function loadPageFromTypedURL(event) {
  // Get the 'pageName' parameter from the URL
  const pageName = getURLParams("pageName");
  const doLoadHomePage = !pageName || pageName === homePage;

  if (doLoadHomePage) {
    loadHomePage(event, false);
    return;
  }

  // Check if the 'pageName' is a valid file type (e.g., .html)
  if (!pageName.endsWith(".html")) {
    console.error("Invalid page type specified. Only .html files are allowed.");
    return;
  }

  // Check if the 'pageName' is an app or a project page
  if (pageName.includes("apps")) {
    loadApp(pageName, event, false);
    return;
  }

  loadProjectPage(pageName, event, false);
}

function handleURLinHistory(url, doPushToHistory) {
  if (!url) {
    console.error("URL is empty");
    return;
  }
  const state = { pageURL: url.toString() };
  if (doPushToHistory) {
    window.history.pushState(state, "", url);
  } else {
    window.history.replaceState(state, "", url);
  }
}

function setupPopStateHandler() {
  window.addEventListener("popstate", function (event) {
    if (event.state && event.state.pageURL) {
      loadPageFromTypedURL(event.state.pageURL);
    } else {
      // Fall back to the default action
      loadHomePage();
    }
  });
}

function setupLoadPageUrlHandler() {
  window.document.addEventListener("DOMContentLoaded", loadPageFromTypedURL);
}

// Function to load the app.html and copy the app-brand-container
function createAppButtonFromHTML(appHtmlPath, onClickFunction) {
  return fetch(appHtmlPath)
    .then((response) => response.text()) // Load the HTML as text
    .then((html) => {
      // Create a temporary DOM element to parse the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      // Find the app-brand-container in the loaded HTML
      const appBrandContainer = tempDiv.querySelector(".app-brand-container");

      if (appBrandContainer) {
        // Create a new button element
        const appButton = document.createElement("button");
        appButton.className = "app-button";

        // Set the provided onClickFunction dynamically
        appButton.onclick = onClickFunction;

        // Clone the app-brand-container and append it to the button
        const clonedAppBrand = appBrandContainer.cloneNode(true);
        appButton.appendChild(clonedAppBrand);

        return appButton; // Return the created button
      } else {
        throw new Error("app-brand-container not found in the app.html file.");
      }
    })
    .catch((error) => console.error("Error loading app.html:", error));
}

function makeAppButton(container, appHTMLPath) {
  const appLoaderFunction = () => {
    loadApp(appHTMLPath, null, true);
  };
  createAppButtonFromHTML(appHTMLPath, appLoaderFunction)
    .then((button) => {
      container.appendChild(button); // Directly append the button element
    })
    .catch((error) =>
      console.error("Error creating and adding app button:", error),
    );
}

function getCardHTML(
  filePath,
  imagePath,
  title,
  description,
  categories,
  type = "",
  date = "",
) {
  categories = categories.sort((a, b) => a.localeCompare(b));

  // Limit description to 140 characters
  const shortDescription =
    description.length > 140
      ? description.substring(0, 140) + "..."
      : description;

  return `
      <div class="g-col-1 card" 
          data-categories="${categories.join(",")}" 
          data-title="${title.toLowerCase()}" 
          data-description="${shortDescription.toLowerCase()}"
          data-date=${parseDate(date)}>
          <a href="javascript:void(0)" class="quarto-grid-link" 
             onclick="loadProjectPage('${filePath}', event)">
                <img src="${imagePath}" class="card-img" alt="">
                <div class="card-body post-contents">
                    <div class="project-type">${type}</div>
                    <span class="card-title-default">${title}</span>
                    <div class="card-details">
                        <h3 class="card-title">${title}</h3>
                        <div class="card-text listing-description">${description}</div>
                        <div class="listing-categories">
                            ${categories.map((cat) => `<div class="listing-category">${cat}</div>`).join("")}
                        </div>
                        <div class="project-date">${date} </div>
                    </div>
                </div>
          </a>
      </div>
    `;
}

function makeProjectCard(filePath, container) {
  return fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load project: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Use the utility function to reduce redundancy
      const title = getElementAttribute(
        doc,
        "#title",
        "textContent",
        "No title",
      );
      const description = getElementAttribute(
        doc,
        "#description",
        "textContent",
        "No description",
      );
      const date = getElementAttribute(doc, "#date", "textContent", "No date");
      const type = getElementAttribute(
        doc,
        "#project-type",
        "textContent",
        "No type",
      );
      const imagePath = getElementAttribute(
        doc,
        "#cover",
        "src",
        "default-image.jpg",
      );

      const categories = Array.from(
        doc.querySelectorAll(".quarto-category"),
      ).map((el) => el.textContent);

      const cardHTML = getCardHTML(
        filePath,
        imagePath,
        title,
        description,
        categories,
        type,
        date,
      );
      container.insertAdjacentHTML("beforeend", cardHTML);

      // Return categories for this project
      return categories;
    })
    .catch((err) => {
      console.error("Error loading project:", err);
      return [];
    });
}

function loadProjects() {
  const container = window.document.getElementById("project-list");
  if (!container) {
    throw new Error(`Element with ID '${container}' not found.`);
  }

  let allCategories = new Set();
  const promises = Object.entries(projectHTMLToCallBackMap).map(
    ([projectKey]) => makeProjectCard(projectKey, container),
  );

  // Use Promise.all to ensure all projects are loaded and allCategories is updated before calling the filter generation
  Promise.all(promises)
    .then((results) => {
      results.forEach((categories) => {
        categories.forEach((category) => allCategories.add(category));
        // Update the Set with each project's categories
      });
      setupCategoryDropDown(allCategories);
      sortProjects(defaultSortOption);
    })
    .catch((err) => {
      console.error("Error loading all projects:", err);
    });
}

function loadApps() {
  const container = window.document.getElementById("app-list");
  if (!container) {
    throw new Error(`Element with ID- app-list not found.`);
  }
  const promises = Object.entries(appHTMLToCallBackMap).map(([appHTML]) =>
    makeAppButton(container, appHTML),
  );
  Promise.all(promises).catch((err) => {
    console.error("Error loading all apps:", err);
  });
}

// Function to dynamically generate the dropdown options based on unique categories
function setupCategoryDropDown(allCategories) {
  const filterDropdown = document.getElementById("categoryFilter");
  const filterSelectedValue = document.getElementById("selectedCategoryValue");
  const button = document.getElementById("categoryFilterBtn");

  if (!filterDropdown || !filterSelectedValue || !button) {
    console.error("Dropdown elements not found");
    return;
  }

  // Creating dropdown items for each category
  allCategories.forEach((category) => {
    filterDropdown.appendChild(createDropdownItem(category, category));
  });

  setupDropdown(button, filterDropdown, filterProjects, filterSelectedValue);
}

// Function to initialize Sort Filter
const sortOptions = [
  { value: "date-desc", label: "Latest", icon: "bi bi-sort-down-alt" },
  { value: "date-asc", label: "Oldest", icon: "bi bi-sort-up" },
  { value: "title-asc", label: "A-Z", icon: "bi bi-sort-alpha-down" },
  { value: "title-desc", label: "Z-A", icon: "bi bi-sort-alpha-down-alt" },
];
const defaultSortOption = "date-desc";

function setupSortOptions() {
  const dropdown = document.getElementById("sortFilter");
  const selectedValue = document.getElementById("selectedSortValue");
  const icon = document.getElementById("sortIcon");
  const button = document.getElementById("sortFilterBtn");

  if (!dropdown || !selectedValue || !button) {
    console.error("Dropdown elements not found");
    return;
  }
  sortOptions.forEach((option) => {
    dropdown.appendChild(
      createDropdownItem(option.value, option.label, option.icon),
    );
  });
  setupDropdown(button, dropdown, sortProjects, selectedValue, icon);
}

// Search projects based on title or description
function filterProjectsBySearchAndCategory(
  searchInput = null,
  category = null,
) {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let isSearchMatch = true;
    let isInCategory = true;
    // Check if the card matches the search input and category
    if (category !== null) {
      const cardCategories = card.getAttribute("data-categories").split(",");
      isInCategory =
        category === "All Categories" || cardCategories.includes(category);
    }
    // Check if the card matches the search input
    if (searchInput !== null && searchInput !== "") {
      const title = card.getAttribute("data-title");
      const description = card.getAttribute("data-description");
      isSearchMatch =
        title.includes(searchInput) || description.includes(searchInput);
    }
    card.style.display = isInCategory && isSearchMatch ? "block" : "none";
  });
}

// Filter projects based on the selected category in the dropdown
function filterProjects(category) {
  filterProjectsBySearchAndCategory(null, category); // Apply the search filter as well
}

// Search projects based on the input value (not case-sensitive)
function searchProjects() {
  let input = document.getElementById("search-input").value.toLowerCase();
  filterProjectsBySearchAndCategory(input, null);
}

/* ------ Sorting projects ------ */
function sortProjects(sortBy) {
  if (!sortOptions.some((option) => option.value === sortBy)) {
    console.error("Invalid sorting option:", sortBy);
    return;
  }

  const sortKey = sortBy.split("-")[0]; // Get the key to sort by (date or title)
  const sortOrder = sortBy.split("-")[1]; // Get the order (asc or desc)

  // Get all project cards
  const container = document.getElementById("project-list");
  const cards = Array.from(container.children);

  cards.sort((a, b) => {
    // Sort by title in ascending or descending order
    if (sortKey === "title") {
      const titleA = a.getAttribute("data-title");
      const titleB = b.getAttribute("data-title");
      return sortOrder === "asc"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    }

    if (sortKey === "date") {
      const dateA = a.getAttribute("data-date");
      const dateB = b.getAttribute("data-date");
      return sortOrder === "asc"
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    }
    return 0;
  });
  cards.forEach((card) => container.appendChild(card));
  // updateSortingIcon(sortBy);
}

function updateSortingIcon(value) {
  const icon = window.document.getElementById("sortFilterIcn");
  if (!icon) {
    console.error("sortFilterIcn not found");
    return;
  }
  icon.className = sortOptions.find((option) => option.value === value).icon;
}

/* ------ End of sorting projects ------ */

function loadSocialMediaLink(identifier) {
  const links = {
    Linkedin: "https://www.linkedin.com/in/manoj-malviya-44700aa4/",
    GitHub: "https://github.com/manoj-malviya-96",
    Instagram: "https://www.instagram.com/manoj_malviya_/",
    Resume:
      "https://cvws.icloud-content.com/B/AZVr5aNt0EIq126VWazH9VSagW8wAR-7iN6Kpy4ay9LWMrZH__eUCrep/CV_2024.pdf?o=At--sekC2lhZ1aggH3t3zJnDqUoAZjSZIrRVNuS58fTa&v=1&x=3&a=CAogvhDM2lsOV2xkYoHk2YwLUnPHSzeJPzqZKG-6LcN_B68SbxDymOikoTIY8vXDpqEyIgEAUgSagW8wWgSUCrepaieq3z-R7OGiDXM-Cg9Cg1hrNMdgKQjpSxA6lpxOFvcqUUBfcrVPYwpyJ1_yMpsUA1yWT6mYtj-atAHgIdr7Tj2XHZVkcfdc3G8bHrZfbCrJgA&e=1726926093&fl=&r=74ca7087-0048-43e3-8418-e9fb8d2bc12c-1&k=XZ6ccwfTmF1UgIx9brekmQ&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=138&s=MnNIirEZTpjkg0RoJyWc3e_evMk&cd=i",
  };

  if (links[identifier]) {
    window.location.href = links[identifier];
  } else {
    console.error("Link not found for identifier:", identifier);
  }
}

function generateTOC() {
  const tocList = document.getElementById("dynamic-toc");
  const sections = document.querySelectorAll("main section[id]"); // Assuming sections in the main content have ids

  // Use template literals to generate TOC items
  sections.forEach((section) => {
    const sectionTitle = section.querySelector("h2")?.textContent || section.id;
    tocList.innerHTML += `
            <li>
                 <a href="#${section.id}" class="nav-link ">
                    ${sectionTitle}
                </a>
            </li>
        `;
  });
  // Set the first TOC item as active
  const firstLink = tocList.querySelector("a");
  if (firstLink) {
    firstLink.classList.add("active");
  }
}

function loadProjectFooter() {
  let footer = document.getElementById("quarto-footer");

  // Check if the footer element exists, if not, dynamically create it
  if (!footer) {
    console.error("Footer placeholder not found in project page");
    return;
  }

  // Use template literals to create the footer structure
  // Inject the footer HTML into the footer element
  footer.innerHTML = `
        <div class="footer-title">
            <button class="footer-icon" id="footer-toggle">
                <i class="bi bi-chevron-down"></i>
            </button>
            <label for="footer-toggle">On this Page </label>
        </div>
        <nav id="TOC" role="doc-toc"> 
            <ul class="footer-toc" id="dynamic-toc"></ul>
        </nav>
        `;
  // Call the function to dynamically generate the TOC
  generateTOC();
  initProjectFooterToggle();
}

// Example usage of loadPDF function
function loadPDFInMainWindow(pdfUrl) {
  loadPDF(pdfUrl, contentPlaceholder, contentPlaceholderOverlay);
}

function scrollElementInViewOnHome(event, elementId) {
  const pageName = getURLParams("pageName");
  // First Load the Home Page
  if (pageName !== homePage) {
    const scrollFn = () => {
      console.log("Scrolling to element:", elementId);
      runWithDelay(scrollElementInView, timeOut_ms, elementId);
    };
    loadHomePage(event, true, [scrollFn]);
    return;
  }
  // If already on the home page
  scrollElementInView(elementId);
}
