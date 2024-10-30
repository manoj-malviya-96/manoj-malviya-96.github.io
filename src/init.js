/* Collection of functions to initialize the website */

function initSidebar() {
  const sidebarPlaceholder = document.getElementById("sidebarPlaceholder");
  if (!sidebarPlaceholder) {
    console.error("Side bar Placeholder doesnt exists");
  }
  loadContent("./sidebar.html", sidebarPlaceholder);
}

function initScrollBehavior() {
  window.document.documentElement.style.scrollBehavior = "smooth";
}

function initTheme() {
  const userTheme = getValueFromStorage("theme", "dark-mode");
  const isThemeSameAsStorage =
    window.document.body.classList.contains(userTheme);
  if (!isThemeSameAsStorage) {
    toggleTheme();
  }
}

function initImageFluidHandler() {
  // Select the first image with the class 'hover-image'
  const images = window.document.querySelectorAll(".img-fluid");

  if (images.length === 0) {
    return; // No images found
  }

  const modal = window.document.createElement("div");
  modal.className = "full-screen-modal";
  const modalImg = window.document.createElement("img");
  modal.appendChild(modalImg);
  window.document.body.appendChild(modal);

  // Add click event listener to each image
  images.forEach((img) => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.classList.add("show");
    });
  });

  modal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Hide the modal when the Esc key is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.classList.remove("show");
    }
  });
}

function toggleForAbout(keepItExpanded = false) {
  const button = window.document.getElementById("toggleAboutBtn");
  if (!button) {
    return; // Button not found
  }
  const content = window.document.getElementById("moreDetailsAboutMe");

  if (keepItExpanded && !content.classList.contains("hide-content")) {
    return; // Keep it expanded
  }
  content.classList.toggle("hide-content");

  // Toggle icon class and button text based on the state
  if (content.classList.contains("hide-content")) {
    button.innerHTML = '<i class="bi bi-chevron-compact-down"></i>';
    button.setAttribute("data-tooltip", "show more");
  } else {
    button.innerHTML = '<i class="bi bi-chevron-compact-up"></i>';
    button.setAttribute("data-tooltip", "show less");
  }
}

function initContentObserver(contentPlaceholder) {
  // Use MutationObserver to detect content change in contentPlaceholder
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        // Disconnect observer after the content has loaded
        observer.disconnect();
      }
    });
  });

  // Start observing the contentPlaceholder for changes
  observer.observe(contentPlaceholder, { childList: true });
}

// Function to initialize the scroll tracking
function initScrollTracking() {
  const sections = document.querySelectorAll("main section"); // Select all sections within the dynamically loaded content
  const navLinks = document.querySelectorAll("#tocListContainer .nav-link"); // Sidebar links

  // Helper function to remove 'active' class from all links
  const removeActiveClasses = () => {
    navLinks.forEach((link) => link.classList.remove("active"));
  };

  // Function to add 'active' class to the corresponding link
  const addActiveClass = (id) => {
    removeActiveClasses();
    const activeLink = document.querySelector(
      `#tocListContainer div[data-value="#${id}"]`,
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  };

  // Track scroll position and update the active link based on the visible section
  window.addEventListener("scroll", function () {
    let currentSection = "";
    const scrollPosition = window.scrollY + window.innerHeight / 1.5; // Get the scroll position relative to the viewport's center

    sections.forEach((section) => {
      const sectionTop = section.offsetTop; // Get section's distance from the top of the document
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      // Adjust condition to check if section is in view, accounting for viewport height
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = sectionId;
      }
    });
    // Update active class based on the current section in view
    if (currentSection) {
      addActiveClass(currentSection);
    }
  });
}

// Initialize the Math rendering library
function initMathJax() {
  const typesetMath = (el) => {
    if (window.MathJax) {
      // MathJax Typeset
      window.MathJax.typeset([el]);
    } else if (window.katex) {
      // KaTeX Render
      let mathElements = el.getElementsByClassName("math");
      let macros = [];
      for (let i = 0; i < mathElements.length; i++) {
        const texText = mathElements[i].firstChild;
        if (mathElements[i].tagName === "SPAN") {
          window.katex.render(texText.data, mathElements[i], {
            displayMode: mathElements[i].classList.contains("display"),
            throwOnError: false,
            macros: macros,
            fleqn: false,
          });
        }
      }
    }
  };
  window.Quarto = {
    typesetMath,
  };
}

// Function to initialize theme toggle after loading header
function toggleTheme() {
  const icon = document.getElementById("theme-icon");
  const toDarkMode = document.body.classList.contains("light-mode");

  if (!icon) {
    console.error("No button");
    return;
  }

  if (toDarkMode) {
    window.document.body.classList.replace("light-mode", "dark-mode");
    icon.className = "bi bi-moon-stars-fill";
  } else {
    window.document.body.classList.replace("dark-mode", "light-mode");
    icon.className = "bi bi-sunrise-fill";
  }

  const theme = toDarkMode ? "dark-mode" : "light-mode";
  storeValueInStorage("theme", theme);
  emitEvent("themeChange", null);
}

// Allows to change the theme of the website
function initThemeChangeHandler(callback) {
  window.document.addEventListener("themeChange", callback);
}

function toggleSidebar() {
  const sidebar = document.getElementById("sideBar");
  const icon = document.getElementById("sidebar-toggle-icon");

  sidebar.classList.toggle("collapsed");

  if (sidebar.classList.contains("collapsed")) {
    icon.className = "bi bi-layout-sidebar";
  } else {
    icon.className = "bi bi-layout-sidebar-inset";
  }
}

function initGithub() {
  window.githubProfile = new GithubProfile("./data/github_user_report.json");
}

function initTooltip() {
  const tooltipTimer_ms = 690; // Delay before showing the tooltip (1000ms)

  let timer;

  const showTooltip = (item) => {
    return setTimeout(function () {
      item.classList.add("show"); // Add class to show the
    }, tooltipTimer_ms); // Delay before showing the tooltip
  };

  const hideTooltip = (item) => {
    clearTimeout(timer); // Cancel the timer if mouse leaves early
    item.classList.remove("show"); // Remove class to hide the tooltip
  };

  document.querySelectorAll(".modern-tooltip").forEach(function (item) {
    item.addEventListener("mouseover", function () {
      timer = showTooltip(item);
    });

    item.addEventListener("mouseout", function () {
      hideTooltip(item);
    });

    item.addEventListener("click", function () {
      hideTooltip(item);
    });
  });
}

function initSlideShow() {
  const slides = document.querySelectorAll(".slideshow img");
  const timeBetweenSlides_ms = 6900; // Time between slides (10s)
  let index = 0;

  // Show the first image initially
  slides[index].classList.add("active");

  setInterval(function () {
    // Hide the current image
    slides[index].classList.remove("active");
    // Move to the next image
    index = (index + 1) % slides.length;
    // Show the next image
    slides[index].classList.add("active");
  }, timeBetweenSlides_ms); // Change image every 3 seconds
}

function initCodeHighlighting() {
  hljs.highlightAll();
  initCopySelectButton();
}

function initCopySelectButton() {
  const showAgainTimeout_ms = 1000 * 60; // Timeout to show the "Copy" button again

  // JavaScript to copy code to clipboard
  const allButtons = window.document.querySelectorAll(".code-copy-button");

  allButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // First, reset all other buttons to the default state
      allButtons.forEach((btn) => {
        if (btn !== button) {
          btn.innerHTML = `<i class="bi bi-clipboard"></i>`;
        }
      });

      // Copy the text of the associated code block
      const codeBlock = button.nextElementSibling.querySelector("code");
      const text = codeBlock.textContent;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // Change the clicked button's inner HTML to show "Copied!"
          button.innerHTML = `<i class="bi bi-check"></i>`;
          setTimeout(() => {
            button.innerHTML = `<i class="bi bi-clipboard"></i>`;
          }, showAgainTimeout_ms);
        })
        .catch(() => {
          button.innerHTML = `<i class="bi bi-exclamation"></i>`;
        });
    });
  });
}
