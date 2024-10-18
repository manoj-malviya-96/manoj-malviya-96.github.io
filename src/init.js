/* Collection of functions to initialize the website */

function initSidebar() {
  const sidebarPlaceholder = document.getElementById("sidebar-placeholder");
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
      modal.style.display = "flex";
    });
  });

  modal.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal on click
  });

  // Hide the modal when the Esc key is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.style.display = "none"; // Hide modal on Esc key press
    }
  });
}

function toggleForAbout(keepItExpanded = false) {
  const button = window.document.getElementById("toggleAboutBtn");
  if (!button) {
    return; // Button not found
  }
  const content = window.document.getElementById("moreDetailsAboutMe");

  if (keepItExpanded && !content.classList.contains("collapsed")) {
    return; // Keep it expanded
  }
  content.classList.toggle("collapsed");

  const aboutEntity = window.document.getElementById("titleAndPictureRow");
  aboutEntity.classList.toggle("collapsed");

  // Toggle icon class and button text based on the state
  if (content.classList.contains("collapsed")) {
    button.innerHTML = '<i class="bi bi-chevron-compact-down"></i>';
  } else {
    button.innerHTML = '<i class="bi bi-chevron-compact-up"></i>';
  }
}

function initProjectFooterToggle() {
  // Function to initialize the theme toggle after loading the content
  window.document
    .getElementById("footer-toggle")
    .addEventListener("click", function () {
      const footer = document.getElementById("quarto-footer");

      // change the icon based on the footer visibility
      const icon = this.querySelector("i");
      const iconUp = "bi-chevron-up";
      const iconDown = "bi-chevron-down";
      if (icon.classList.contains(iconDown)) {
        icon.classList.remove(iconDown);
        icon.classList.add(iconUp);
      } else {
        icon.classList.remove(iconUp);
        icon.classList.add(iconDown);
      }
      footer.classList.toggle("footer-hidden"); // Toggle the "footer-collapsed" class
    });
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
  const navLinks = document.querySelectorAll("#TOC .nav-link"); // Sidebar links

  // Helper function to remove 'active' class from all links
  const removeActiveClasses = () => {
    navLinks.forEach((link) => link.classList.remove("active"));
  };

  // Function to add 'active' class to the corresponding link
  const addActiveClass = (id) => {
    removeActiveClasses();
    const activeLink = document.querySelector(`#TOC a[href="#${id}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  };

  // Track scroll position and update the active link based on the visible section
  window.addEventListener("scroll", function () {
    let currentSection = "";
    const scrollPosition = window.scrollY + window.innerHeight / 2; // Get the scroll position relative to the viewport's center

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

  storeValueInStorage("theme", toDarkMode ? "dark-mode" : "light-mode");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sideBar");
  const icon = document.getElementById("sidebar-toggle-icon");

  sidebar.classList.toggle("collapsed");

  if (sidebar.classList.contains("collapsed")) {
    icon.className = "bi bi-chevron-right";
  } else {
    icon.className = "bi bi-chevron-left";
  }
}

function initGithub() {
  window.githubProfile = new GithubProfile("./data/github_user_report.json");
}

function initTooltip() {
  const tooltipTimer_ms = 690; // Delay before showing the tooltip (1000ms)

  let timer;

  const showTooltip = (item)=> {
    return setTimeout(function () {
        item.classList.add('show'); // Add class to show the
    }, tooltipTimer_ms); // Delay before showing the tooltip
  }


  const hideTooltip = (item)=> {
    clearTimeout(timer); // Cancel the timer if mouse leaves early
    item.classList.remove('show'); // Remove class to hide the tooltip
  }

  document.querySelectorAll('.modern-tooltip').forEach(function (item) {

    item.addEventListener('mouseover', function () {
      timer = showTooltip(item);
    });

    item.addEventListener('mouseout', function () {
        hideTooltip(item);
    });

    item.addEventListener('click', function () {
      hideTooltip(item);
    });

  });
}

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
