/* Collection of functions to initialize the website */

function initHeader() {
    let headerPlaceholder = document.getElementById('header-placeholder');
    loadContent("./header.html", headerPlaceholder);
}

function initGithub() {
    GitHubCalendar(".calendar", "manoj-malviya-96", {
        responsive: true
    });
}

function initScrollBehavior() {
    window.document.documentElement.style.scrollBehavior = 'smooth';
}

function initTheme() {
    const userTheme = getValueFromStorage('theme', 'dark-mode');
    const isThemeSameAsStorage = window.document.body.classList.contains(userTheme);
    if (!isThemeSameAsStorage) {
        toggleTheme();
    }
}


function initImageFluidHandler() {
    // Select the first image with the class 'hover-image'
    const images = window.document.querySelectorAll('.img-fluid');

    if (images.length === 0) {
        return; // No images found
    }

    const modal = window.document.createElement('div');
    modal.className = 'full-screen-modal';
    const modalImg = window.document.createElement('img');
    modal.appendChild(modalImg);
    window.document.body.appendChild(modal);

    // Add click event listener to each image
    images.forEach((img) => {
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modal.style.display = 'flex';
        });
    });

    modal.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide modal on click
    });

    // Hide the modal when the Esc key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modal.style.display = 'none'; // Hide modal on Esc key press
        }
    });

}


function initToggleForAbout() {
    const button = window.document.querySelector('.toggle-expand-button');
    if (!button) {
        return; // Button not found
    }
    button.addEventListener('click', function () {
        this.classList.toggle('expanded');

        const content = window.document.querySelector('.collapsible-content');
        content.classList.toggle('expanded');

        const aboutEntity = window.document.querySelector('.about-entity');
        aboutEntity.classList.toggle('collapsed');


        // Toggle icon class and button text based on the state
        if (content.classList.contains('expanded')) {
            this.innerHTML = '<i class="bi bi-chevron-compact-up"></i>';
        } else {
            this.innerHTML = '<i class="bi bi-chevron-compact-down"></i>';
        }
    });
}


function initProjectFooterToggle() {
    // Function to initialize the theme toggle after loading the content
    window.document.getElementById('footer-toggle').addEventListener('click', function () {
        const footer = document.getElementById('quarto-footer');

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
        footer.classList.toggle('footer-hidden'); // Toggle the "footer-collapsed" class
    });
}


function initContentObserver(contentPlaceholder) {
    // Use MutationObserver to detect content change in contentPlaceholder
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Re-initialize scroll and active link logic
                initScrollTracking();

                // Disconnect observer after the content has loaded
                observer.disconnect();
            }
        });
    });

    // Start observing the contentPlaceholder for changes
    observer.observe(contentPlaceholder, {childList: true});
}

// Function to initialize the scroll tracking
function initScrollTracking() {
    const sections = document.querySelectorAll('main section'); // Select all sections within the dynamically loaded content
    const navLinks = document.querySelectorAll('#TOC .nav-link'); // Sidebar links

    // Helper function to remove 'active' class from all links
    const removeActiveClasses = () => {
        navLinks.forEach(link => link.classList.remove('active'));
    };

    // Function to add 'active' class to the corresponding link
    const addActiveClass = (id) => {
        removeActiveClasses();
        const activeLink = document.querySelector(`#TOC a[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    };

    // Track scroll position and update the active link based on the visible section
    window.addEventListener('scroll', function () {
        let currentSection = '';
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Get the scroll position relative to the viewport's center

        sections.forEach(section => {
            const sectionTop = section.offsetTop; // Get section's distance from the top of the document
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Adjust condition to check if section is in view, accounting for viewport height
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        // Update active class based on the current section in view
        if (currentSection) {
            addActiveClass(currentSection);
        }
    });
}


// Function to initialize Sort Filter
const sortOptions = [
    {value: 'date-desc', label: 'Latest', icon: 'bi-sort-down-alt'},
    {value: 'date-asc', label: 'When I was a kid', icon: 'bi-sort-up'},
    {value: 'title-asc', label: 'A-Z', icon: 'bi-sort-alpha-down'},
    {value: 'title-desc', label: 'Z-A', icon: 'bi-sort-alpha-down-alt'}
];
const defaultSortOption = 'date-desc';

function initSortOptions() {
    const select = document.getElementById('sort-filter');

    if (!select) {
        return; // Select element not found
    }

    sortOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        select.appendChild(opt);
    });
}


// Initialize the Math rendering library
function initMathJax(){
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
                        displayMode: mathElements[i].classList.contains('display'),
                        throwOnError: false,
                        macros: macros,
                        fleqn: false
                    });
                }
            }
        }
    }
    window.Quarto = {
        typesetMath
    };
}