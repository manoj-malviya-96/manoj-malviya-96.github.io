/** ---------------------------- Global variables - Accessible across all scripts  ---------------------------- **/

const contentPlaceholder = window.document.getElementById("contentPlaceholder");
const contentPlaceholderOverlay = window.document.getElementById(
  "contentLoadingOverlay",
);

const homePage = "./home.html";
const homePageCallbacks = [
  initTheme,
  initGithub,
  initSlideShow,
  setupSortOptions,
  makeAppButtons,
  makeBlogCardsAndSetupControls,
];

const defaultBlogCallbacks = [
  initTheme,
  loadTableOfContents, //Order Matters
  initImageFluidHandler,
  initScrollTracking,
  initCodeHighlighting, //Should be after initTheme
];

const blogHTMLToExtraCallbacks = {
  "./blogs/delta-design/delta-design.html": [createPlotsForDeltaDesign],
  "./blogs/topt/rapid-topt.html": [],
  "./blogs/cub-companion/cub-companion.html": [],
  "./blogs/dfam/dfam.html": [createPlotsForDfam],
  "./blogs/embed-am/embed-am.html": [],
  "./blogs/build-orient/build-orient.html": [],
  "./blogs/formlabs-ui/ui-lead.html": [],
  "./blogs/cpp-threads/cpp-threads.html": [],
  // "./blogs/this-blog/this-blog.html": [],
};

// App-specific callbacks
const defaultAppCallbacks = [initTheme];
const appHTMLToInits = {
  "./apps/music-viz/music-viz.html": [initMusicApp],
  "./apps/mesh-morph/mesh-morph.html": [initMeshMorph],
  "./apps/lattice-topt/lattice-topt.html": [initLatticeTopt],
  "./apps/coming-soon/coming-soon.html": [],
};

/** ---------------------------- Content Loader  ---------------------------- **/
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
      initTooltip();
    },
  );
  handleURLinHistory(addParamsToURL({ pageName: page }), doPushToHistory);
  initContentObserver(contentPlaceholder);
}

/** We have three types of pages: home, apps and blogs pages. */
// 1. Load the homepage content -> About me and blogs cards.
function loadHomePage(
  event = null,
  doPushToHistory = true,
  extraCallbacks = [],
) {
  const callbacks = homePageCallbacks.concat(extraCallbacks);
  loadContentInMainWindow(homePage, event, callbacks, doPushToHistory);
}

// 2. Load Project Page with the specified callbacks
function loadBlogPage(page, event, doPushToHistory = true) {
  const callbacks = defaultBlogCallbacks.concat(blogHTMLToExtraCallbacks[page]);
  loadContentInMainWindow(page, event, callbacks, doPushToHistory);
}

// 3. Load App Window with the specified callbacks
function loadApp(page, event, doPushToHistory = true) {
  const callbacks = defaultAppCallbacks.concat(appHTMLToInits[page]);
  loadContentInMainWindow(page, event, callbacks, doPushToHistory);
}

function loadPDFInMainWindow(pdfUrl) {
  loadPDF(pdfUrl, contentPlaceholder, contentPlaceholderOverlay);
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

  // Check if the 'pageName' is an app or a blogs page
  if (pageName.includes("apps")) {
    loadApp(pageName, event, false);
    return;
  }

  loadBlogPage(pageName, event, false);
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

/** ---------------------------- Apps Loader  ---------------------------- **/

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
        appButton.className = "primary-button with-border";

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

function makeAppButtons() {
  const container = window.document.getElementById("appList");
  container.innerHTML = ""; // Clear the container before adding new cards
  if (!container) {
    throw new Error(`Element with ID- appList not found.`);
  }
  const promises = Object.entries(appHTMLToInits).map(([appHTML]) =>
    makeAppButton(container, appHTML),
  );
  Promise.all(promises).catch((err) => {
    console.error("Error loading all apps:", err);
  });
}

/** ---------------------------- Blog Cards  ---------------------------- **/

function createBlogCardHTML(
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
             onclick="loadBlogPage('${filePath}', event)">
                <img src="${imagePath}" class="card-img" alt="">
                <div class="card-label">${title}</div>
                <div class="card-details">
                    <h3 class="underline">${title}</h3>
                    <p>${description}</p>
                    <div class="tag-categories">
                        ${categories.map((cat) => `<div class="tag-category">${cat}</div>`).join("")}
                    </div>
                    <div class="tag-date">${date} </div>
                </div>
          </a>
      </div>
    `;
}

function makeBlogCard(filePath, container) {
  return fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load blogs: ${response.statusText}`);
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
        "#card-label",
        "textContent",
        "No type",
      );
      const imagePath = getElementAttribute(
        doc,
        "#cover",
        "src",
        "default-image.jpg",
      );

      const categories = Array.from(doc.querySelectorAll(".tag-category")).map(
        (el) => el.textContent,
      );

      const cardHTML = createBlogCardHTML(
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

function makeBlogCardsAndSetupControls() {
  const container = window.document.getElementById("blogList");
  if (!container) {
    throw new Error(`Element with ID '${container}' not found.`);
  }
  container.innerHTML = ""; // Clear the container before adding new cards

  let allCategories = new Set();
  const promises = Object.entries(blogHTMLToExtraCallbacks).map(
    ([projectKey]) => makeBlogCard(projectKey, container),
  );

  // Use Promise.all to ensure all projects are loaded and allCategories is updated before calling the filter generation
  Promise.all(promises)
    .then((results) => {
      results.forEach((categories) => {
        categories.forEach((category) => allCategories.add(category));
        // Update the Set with each project's categories
      });
      setupSkillsDropDown(allCategories);
      sortBlogCards(defaultSortOption);
    })
    .catch((err) => {
      console.error("Error loading all projects:", err);
    });
}

// Function to dynamically generate the dropdown options based on unique categories
function setupSkillsDropDown(allCategories) {
  const dropdownList = window.document.getElementById("skillsList");
  const dropdown = window.document.getElementById("skillsFilter");

  if (!dropdownList || !dropdown) {
    console.error("Dropdown elements not found" + dropdownList + dropdown);
    return;
  }

  // Creating dropdown items for each category
  allCategories.forEach((category) => {
    dropdownList.appendChild(createDropdownItem(category, category));
  });
  setupDropdown(dropdown, filterBlogsByCategory);
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
  const dropdown = window.document.getElementById("sortDropdown");
  const dropdownList = document.getElementById("sortFilterList");

  if (!dropdownList || !dropdown) {
    console.error("Dropdown elements not found" + dropdownList + dropdown);
    return;
  }
  sortOptions.forEach((option) => {
    dropdownList.appendChild(
      createDropdownItem(option.value, option.label, option.icon),
    );
  });
  setupDropdown(dropdown, sortBlogCards);
}

// Search projects based on title or description
function filterBlogs(searchInput = null, category = null) {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let isSearchMatch = true;
    let isInCategory = true;
    // Check if the card matches the search input and category
    if (category !== null) {
      const cardCategories = card.getAttribute("data-categories").split(",");
      isInCategory = category === "All" || cardCategories.includes(category);
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
function filterBlogsByCategory(category) {
  filterBlogs(null, category); // Apply the search filter as well
}

// Search projects based on the input value (not case-sensitive)
function filterBlogsByKeywords() {
  let input = document.getElementById("search-input").value.toLowerCase();
  filterBlogs(input, null);
}

/* ------ Sorting projects ------ */
function sortBlogCards(sortBy) {
  if (!sortOptions.some((option) => option.value === sortBy)) {
    console.error("Invalid sorting option:", sortBy);
    return;
  }

  const sortKey = sortBy.split("-")[0]; // Get the key to sort by (date or title)
  const sortOrder = sortBy.split("-")[1]; // Get the order (asc or desc)

  // Get all project cards
  const container = document.getElementById("blogList");
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
}

/** ---------------------------- Blog Page Functions  ---------------------------- **/
function loadTableOfContents() {
  let tableOfContents = document.getElementById("tableOfContents");

  // Check if the footer element exists, if not, dynamically create it
  if (!tableOfContents) {
    console.error("Footer placeholder not found in project page");
    return;
  }

  // Use template literals to create the footer structure
  // Inject the footer HTML into the footer element
  tableOfContents.innerHTML = `
        <div class="row-layout">
          <nav id="tocListContainer" role="doc-toc"> 
              <ul class="blog-sidebar-list" id="tocList"></ul>
          </nav>
          <button class="blog-sidebar-toggle primary-button smaller with-border" id="tocToggle">
              <i class="bi bi-chevron-right"></i>
          </button>
        </div>
        `;
  // Call the function to dynamically generate the TOC
  generateTableOfContentsForBlogPages();
  setupBlogToggleButton();
}

function generateTableOfContentsForBlogPages() {
  const tocList = document.getElementById("tocList");
  const sections = document.querySelectorAll("main section[id]"); // Assuming sections in the main content have ids

  // Use template literals to generate TOC items
  sections.forEach((section) => {
    const sectionTitle = section.querySelector("h2")?.textContent || section.id;
    tocList.innerHTML += `
            <li>
                 <div data-value="#${section.id}" class="nav-link" onclick="scrollElementInView('${section.id}')">
                    ${sectionTitle}
                </div>
            </li>
        `;
  });
  // Set the first TOC item as active
  const firstLink = tocList.querySelector("div");
  if (firstLink) {
    firstLink.classList.add("active");
  }
}

function setupBlogToggleButton() {
  // Function to initialize the theme toggle after loading the content
  window.document
    .getElementById("tocToggle")
    .addEventListener("click", function () {
      const toc = document.getElementById("tableOfContents");

      // change the icon based on the footer visibility
      const icon = this.querySelector("i");
      const iconToHide = "bi-chevron-right";
      const iconToShow = "bi-chevron-left";
      if (icon.classList.contains(iconToHide)) {
        icon.classList.replace(iconToHide, iconToShow);
      } else {
        icon.classList.replace(iconToShow, iconToHide);
      }
      toc.classList.toggle("hide-list"); // Toggle the "footer-collapsed" class
    });
}

/** ---------------------------- Misc Functions  ---------------------------- **/

function isUserOnHomePage() {
  const pageName = getURLParams("pageName");
  return pageName === homePage;
}

function scrollElementInViewOnHome(event, elementId) {
  // First Load the Home Page
  if (!isUserOnHomePage()) {
    const scrollFn = () => {
      runWithDelay(scrollElementInView, timeOut_ms, elementId);
    };
    loadHomePage(event, true, [scrollFn]);
    return;
  }
  // If already on the home page
  scrollElementInView(elementId);
}
