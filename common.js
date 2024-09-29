// common.js
// Store all unique categories here
let timeOut_ms = 690;
const availableCallbacks = {
    "loadProjects": loadProjects,
    "loadFooter": loadProjectFooter,
};

// Function to update or add the 'pageName' parameter in the URL
function updateURLParameter(pageName) {
    const url = new URL(window.location);
    url.searchParams.set('pageName', pageName); // Set the pageName parameter
    console.log('Updated URL:', url.href, pageName);
    window.history.pushState({}, '', url); // Update the URL without reloading the page
}

function createProjectCard(filePath, imagePath, title,
                           description, categories,
                           type = "", date = "") {
    categories = categories.sort((a, b) => a.localeCompare(b));
    return `
        <div class="g-col-1 project-card" 
            data-categories="${categories.join(',')}" 
             data-title="${title.toLowerCase()}" 
             data-description="${description.toLowerCase()}"
             data-date=${parseDate(date)}">
            <a href="${title}" class="quarto-grid-link"
               onclick="emitLoadPageEvent('${filePath}', event, true)">
                <div class="quarto-grid-item card">
                    <div class="column-image">
                        <img src="${imagePath}" class="card-img" alt="">
                    </div>
                    <div class="card-body post-contents">
                        <div class="project-type">${type}</div>
                        <h3 class="no-anchor card-title listing-title">${title}</h3>
                        <div class="card-text listing-description">${description}</div>
                        <div class="listing-categories">
                            ${categories.map(cat => `<div class="listing-category">${cat}</div>`).join('')}
                        </div>
                        <div class="project-date">${date} </div>
                    </div>
                </div>
            </a>
        </div>
    `;
}

function getId(doc, id, defaultValue = '') {
    return doc.querySelector(id) ? doc.querySelector(id).textContent : defaultValue;
}

function loadProject(filePath, containerId) {
    return fetch(filePath)
        .then(response => response.text())
        .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, 'text/html');

            const title = getId(doc, '#title', 'No title');
            const description = getId(doc, '#description', 'No description');
            const date = getId(doc, '#date', 'No date');
            const type = getId(doc, '#project-type', 'No type');

            const imagePath = doc.querySelector('#cover') ?
                doc.querySelector('#cover').getAttribute('src') : 'default-image.jpg';


            const categories = Array.from(doc.querySelectorAll('.quarto-category')).map(el => el.textContent);

            const cardHTML = createProjectCard(filePath, imagePath, title, description, categories, type, date);

            let container = document.getElementById(containerId);
            if (!container) {
                console.error(`Element with ID '${containerId}' not found.`);
                return;
            }
            container.insertAdjacentHTML('beforeend', cardHTML);
            // Return the categories for this project
            return categories;
        })
        .catch(err => {
            console.error('Error loading project:', err);
            return [];
        });
}

function loadProjects() {
    const containerId = 'project-list';
    const projects = [
        './research/delta-design/delta-design.html',
        './research/topt/rapid-topt.html',
        './research/cub-companion/cub-companion.html',
        './research/dfam/dfam.html',
        './research/embed-am/embed-am.html',
        './research/build-orient/build-orient.html',
        './job/ui-lead/ui-lead.html',
    ];
    let allCategories = new Set();
    const promises = projects.map(filePath => loadProject(filePath, containerId));

    // Use Promise.all to ensure all projects are loaded and allCategories is updated before calling the filter generation
    Promise.all(promises).then(results => {
        results.forEach(categories => {
            categories.forEach(category => allCategories.add(category));
            // Update the Set with each project's categories
        });
        generateDropdownFilters(allCategories);
        sortProjects('desc-date'); // Sort projects by title in ascending order
    }).catch(err => {
        console.error('Error loading all projects:', err);
    });
}

// Function to dynamically generate the dropdown options based on unique categories
function generateDropdownFilters(allCategories) {
    const filterDropdown = document.getElementById('category-filter');

    // Create option elements for each category dynamically
    allCategories.forEach(category => {
        let option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filterDropdown.appendChild(option);
    });
}

// Filter projects based on the selected category in the dropdown
function filterProjects(category) {
    filterProjectsBySearchAndCategory(null, category); // Apply the search filter as well
}

function searchProjects() {
    let input = document.getElementById('search-input').value.toLowerCase();
    filterProjectsBySearchAndCategory(input, null);
}

// Search projects based on title or description
function filterProjectsBySearchAndCategory(searchInput = null, category = null) {
    let cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        let isSearchMatch = true;
        let isInCategory = true;

        // Check if the card matches the search input and category
        if (category !== null) {
            let cardCategories = card.getAttribute('data-categories').split(',');
            isInCategory = category === 'all' || cardCategories.includes(category);
        }
        // Check if the card matches the search input
        if (searchInput !== null && searchInput !== "") {
            let title = card.getAttribute('data-title');
            let description = card.getAttribute('data-description');
            isSearchMatch = title.includes(searchInput) || description.includes(searchInput);
        }

        if (isInCategory && isSearchMatch) {
            card.style.display = 'block';  // Show the card if it matches the search and is not filtered out
        } else {
            card.style.display = 'none';  // Hide the card
        }
    });
}


function sortProjects(sortBy) {
    let container = document.getElementById('project-list');
    let cards = Array.from(container.children);
    cards.sort((a, b) => {
        // Sort by title in ascending or descending order
        if (sortBy === 'asc-title' || sortBy === 'desc-title') {
            let titleA = a.getAttribute('data-title');
            let titleB = b.getAttribute('data-title');
            return sortBy === 'asc-title' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
        }

        if (sortBy === 'asc-date' || sortBy === 'desc-date') {
            let dateA = a.getAttribute('data-date');
            let dateB = b.getAttribute('data-date');
            return sortBy === 'asc-date' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
        }

        return 0;
    });
    cards.forEach(card => container.appendChild(card));
}

function changeSortIcon(value) {
    let icon = document.getElementById('sort-icon').querySelector("i");
    if (!icon) {
        console.error('Sort icon not found');
        return;
    }

    switch (value) {
        case 'asc-date':
            icon.className = 'bi bi-sort-numeric-down'; // Icon for 1-9
            break;
        case 'desc-date':
            icon.className = 'bi bi-sort-numeric-down-alt'; // Icon for 9-1
            break;
        case 'asc-title':
            icon.className = 'bi bi-sort-alpha-down'; // Icon for A-Z
            break;
        case 'desc-title':
            icon.className = 'bi bi-sort-alpha-down-alt'; // Icon for Z-A
            break;
    }
}


function loadContent(page, placeholder, callback = null) {
    // Show the overlay before loading content
    placeholder.style.display = 'none';
    fetch(page)
        .then(response => response.text())
        .then(data => {
            placeholder.innerHTML = data;
            placeholder.style.display = 'block'; // Show the content
            if (callback) callback(); // Call callback after loading content
        })
        .catch(error => {
            console.error('Error loading content:', error);
            placeholder.innerHTML = '<p>Error loading content. Please try again later.</p>';
            placeholder.style.display = 'block';
        });
}


function loadContentWithDelay(page, placeholder, overlay, callback = null) {
    // Show the overlay before loading content
    overlay.style.display = 'flex';
    placeholder.style.display = 'none';

    fetch(page)
        .then(response => response.text())
        .then(data => {
            placeholder.innerHTML = data;
            setTimeout(() => {
                overlay.style.display = 'none'; // Hide the overlay
                placeholder.style.display = 'block'; // Show the content
                // Call the callback AFTER the content is injected
                if (callback) {
                    callback();
                }
            }, timeOut_ms); // 500 milliseconds delay, adjust as needed
        })
        .catch(error => {
            console.error('Error loading content:', error);
            overlay.style.display = 'none';
            placeholder.innerHTML = '<p>Error loading content. Please try again later.</p>';
            placeholder.style.display = 'block';
        });
}


const pageEventHandlerName = "loadPageOnMain";

function emitLoadPageEvent(page, event, isProject = false) {
    console.log('Emitting loadPage event:', page);
    event.preventDefault();

    let appInitCallBackKey = null;
    if (page.startsWith("./apps")) {
        appInitCallBackKey = "loadSumApp";
    }

    const loadPageEvent = new CustomEvent(pageEventHandlerName, {
        detail: {
            page: page,
            isProject: isProject,
            appInitCallBackKey: appInitCallBackKey
        }
    });
    window.document.dispatchEvent(loadPageEvent);
}

function getURLParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function loadSocialMediaLink(identifier) {
    const links = {
        Linkedin: "https://www.linkedin.com/in/manoj-malviya-44700aa4/",
        GitHub: "https://github.com/manoj-malviya-96",
        Instagram: "https://www.instagram.com/manoj_malviya_/",
        Resume: "https://cvws.icloud-content.com/B/AZVr5aNt0EIq126VWazH9VSagW8wAR-7iN6Kpy4ay9LWMrZH__eUCrep/CV_2024.pdf?o=At--sekC2lhZ1aggH3t3zJnDqUoAZjSZIrRVNuS58fTa&v=1&x=3&a=CAogvhDM2lsOV2xkYoHk2YwLUnPHSzeJPzqZKG-6LcN_B68SbxDymOikoTIY8vXDpqEyIgEAUgSagW8wWgSUCrepaieq3z-R7OGiDXM-Cg9Cg1hrNMdgKQjpSxA6lpxOFvcqUUBfcrVPYwpyJ1_yMpsUA1yWT6mYtj-atAHgIdr7Tj2XHZVkcfdc3G8bHrZfbCrJgA&e=1726926093&fl=&r=74ca7087-0048-43e3-8418-e9fb8d2bc12c-1&k=XZ6ccwfTmF1UgIx9brekmQ&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=138&s=MnNIirEZTpjkg0RoJyWc3e_evMk&cd=i"
    };

    if (links[identifier]) {
        window.location.href = links[identifier];
    } else {
        console.error("Link not found for identifier:", identifier);
    }
}

function generateTOC() {
    const tocList = document.getElementById('dynamic-toc');
    const sections = document.querySelectorAll('main section[id]'); // Assuming sections in the main content have ids

    // Use template literals to generate TOC items
    sections.forEach(section => {
        const sectionTitle = section.querySelector('h2')?.textContent || section.id;
        tocList.innerHTML += `
            <li>
                 <a href="#${section.id}" class="nav-link ">
                    ${sectionTitle}
                </a>
            </li>
        `;
    });
    // Set the first TOC item as active
    const firstLink = tocList.querySelector('a');
    if (firstLink) {
        firstLink.classList.add('active');
    }
}

function initProjectFooterToggle() {
    // Function to initialize the theme toggle after loading the content
    document.getElementById('footer-toggle').addEventListener('click', function () {
        let footer = document.getElementById('quarto-footer');

        // change the icon based on the footer visibility
        let icon = this.querySelector("i");
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

function loadProjectFooter() {
    let footer = document.getElementById('quarto-footer');

    // Check if the footer element exists, if not, dynamically create it
    if (!footer) {
        console.error('Footer placeholder not found in project page');
        return;
    }

    // Use template literals to create the footer structure
    // Inject the footer HTML into the footer element
    footer.innerHTML = `
        <div class="footer-title">
            <button class="footer-icon" id="footer-toggle">
                <i class="bi bi-chevron-down"></i>
            </button>
            <label for="footer-toggle">Table of contents</label>
        </div>
        <nav id="TOC" role="doc-toc">
            <ul class="footer-toc" id="dynamic-toc"></ul>
        </nav>
        `;
    // Call the function to dynamically generate the TOC
    generateTOC();
    initProjectFooterToggle();
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


// Function to initialize theme toggle after loading header
function toggleTheme() {
    const icon = document.getElementById('theme-icon');
    const toDarkMode = document.body.classList.contains('light-mode');

    if (toDarkMode) {
        document.body.classList.replace('light-mode', 'dark-mode');
        icon.className = 'bi bi-moon-stars-fill';
    } else {
        document.body.classList.replace('dark-mode', 'light-mode');
        icon.className = 'bi bi-sunrise-fill';
    }

    storeValueInStorage('theme', toDarkMode ? 'dark-mode' : 'light-mode');
}

function loadPDF(url, contentPlaceholder, contentPlaceholderOverlay) {
    // Show the loading spinner
    contentPlaceholderOverlay.style.display = 'block';
    contentPlaceholder.style.display = 'none';

    // Create a container div to center the iframe
    const iframeContainer = document.createElement('div');
    iframeContainer.style.display = 'flex';
    iframeContainer.style.justifyContent = 'center'; // Center horizontally
    iframeContainer.style.paddingTop = '0px'; // Add top padding
    iframeContainer.style.width = '100%'; // Ensure the container takes the full width

    // Create the iframe element
    const iframe = document.createElement('iframe');
    iframe.src = url; // Set the source to the PDF URL
    iframe.style.width = '69%';
    iframe.style.height = '100vh'; // Adjust the height as needed
    iframe.style.border = 'none';

    // Append the iframe to the container
    iframeContainer.appendChild(iframe);

    // Remove any previous content and add the container with the iframe
    contentPlaceholder.innerHTML = '';
    contentPlaceholder.appendChild(iframeContainer);

    // Show the content and hide the spinner once the iframe is loaded
    iframe.onload = () => {
        contentPlaceholderOverlay.style.display = 'none';
        contentPlaceholder.style.display = 'block';
    };

    // Handle iframe loading errors (optional)
    iframe.onerror = () => {
        contentPlaceholderOverlay.style.display = 'none';
        alert('Failed to load the PDF. Please try again.');
    };
}

// Example usage of loadPDF function
function loadPDFContent(pdfUrl) {
    const contentPlaceholder = document.getElementById('content-placeholder');
    const contentPlaceholderOverlay = document.getElementById('content-placeholder-overlay');
    loadPDF(pdfUrl, contentPlaceholder, contentPlaceholderOverlay);
}


function fromTxtMonth(month) {
    switch (month) {
        case 'Jan':
            return 1;
        case 'Feb':
            return 2;
        case 'Mar':
            return 3;
        case 'Apr':
            return 4;
        case 'May':
            return 5;
        case 'Jun':
            return 6;
        case 'Jul':
            return 7;
        case 'Aug':
            return 8;
        case 'Sep':
            return 9;
        case 'Oct':
            return 10;
        case 'Nov':
            return 11;
        case 'Dec':
            return 12;
    }
}

function parseDate(dateString) {
    // date = "Sep 1, 2021"
    const day = parseInt(dateString.split(' ')[1].replace(',', ''));
    const month = fromTxtMonth(dateString.split(' ')[0]);
    const year = parseInt(dateString.split(' ')[2]);
    return year * 10000 + month * 100 + day; // Format: YYYYMMDD
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


function initToggleForAbout() {
    const button = window.document.querySelector('.about-expand-button');
    if (!button) {
        return;
    }
    button.addEventListener('click', function () {
        this.classList.toggle('expanded');

        const content = window.document.querySelector('.collapsible-content');
        content.classList.toggle('expanded');

        // Get the icon element inside the button
        const icon = this.querySelector('i');

        // Toggle icon class and button text based on the state
        if (content.classList.contains('expanded')) {
            icon.className = 'bi bi-arrow-up-circle'; // Change to up arrow icon
            this.innerHTML = '<i class="bi bi-arrow-up"></i> Show Less';
        } else {
            icon.className = 'bi bi-arrow-down-circle'; // Change back to down arrow icon
            this.innerHTML = '<i class="bi bi-arrow-down"></i> Show More';
        }
    });
}


function initImageFluidHandler() {
    // Select the first image with the class 'hover-image'
    const images = window.document.querySelectorAll('.img-fluid');

    if (images.length === 0) {
        console.log('Image container not found');
        return;
    }

    const modal = window.document.createElement('div');
    modal.id = 'fullScreenModal';
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

function initGithub() {
    console.log('Init Github');
    GitHubCalendar(".calendar", "manoj-malviya-96", {
        responsive: true
    });
}


function storeValueInStorage(key, value) {
    localStorage.setItem(key, value);
}

function getValueFromStorage(key, defaultValue) {
    return localStorage.getItem(key) || defaultValue;
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
