// common.js

// Store all unique categories here
let timeOut_ms = 690;

function createProjectCard(filePath, imagePath, title, description, categories) {
    return `
        <div class="g-col-1 project-card" data-categories="${categories.join(',')}" 
             data-title="${title.toLowerCase()}" data-description="${description.toLowerCase()}">
            <a href="javascript:void(0)" class="quarto-grid-link"
               onclick="emitLoadPageEvent('${filePath}', event, true)">
                <div class="quarto-grid-item card h-100 card-left">
                    <div class="card-img-top">
                        <img src="${imagePath}" class="thumbnail-image card-img" alt="">
                    </div>
                    <div class="card-body post-contents">
                        <h3 class="no-anchor card-title listing-title">${title}</h3>
                        <div class="card-text listing-description">${description}</div>
                        <div class="listing-categories">
                            ${categories.map(cat => `<div class="listing-category">${cat}</div>`).join('')}
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
}

function loadProject(filePath, containerId) {
    return fetch(filePath)
        .then(response => response.text())
        .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, 'text/html');

            const title = doc.querySelector('#title') ?
                doc.querySelector('#title').textContent : 'Untitled';
            const description = doc.querySelector('#description') ?
                doc.querySelector('#description').textContent : 'No description';
            const imagePath = doc.querySelector('#cover') ?
                doc.querySelector('#cover').getAttribute('src') : 'default-image.jpg';

            const categories = Array.from(doc.querySelectorAll('.quarto-category')).map(el => el.textContent);

            const cardHTML = createProjectCard(filePath, imagePath, title, description, categories);

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
        './posts/delta-design.html',
        './posts/rapid-topt.html',
        './posts/cub-companion.html',
        './posts/3dp-design.html',
        './posts/template.html',
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

function nameOfTheAuthor() {
    return "Manoj Malviya";
}

const pageEventHandlerName = "loadPageOnMain";


function emitLoadPageEvent(page, event, isProject = false) {
    event.preventDefault();
    const loadPageEvent = new CustomEvent(pageEventHandlerName, {
        detail: {
            page: page,
            isProject: isProject
        }
    });
    window.document.dispatchEvent(loadPageEvent);
}

function loadSocialMediaLink(identifier) {
    const links = {
        Linkedin: "https://www.linkedin.com/in/manoj-malviya-44700aa4/",
        GitHub: "https://github.com/manoj-malviya-96",
        Instagram: "https://www.instagram.com/manoj_malviya_/",
        Resume: "https://cvws.icloud-content.com/B/AVdOlXdVRdgBlHTMQiAjcPj-jqqKAVFANNkDP8kh3t5UyDujg9KKX3Ya/CV_2024.pdf?o=AtxEfDzSELYx_1ad1KhPTTSvoxjbaKmSfg2ZbpeNaDbF&v=1&x=3&a=CAog1LZttG_DQ2QtZKl1rjlXIxZcWfX9Rvms2i7F79HiD_oSbxDNlY-HnzIYzfLqiJ8yIgEAUgT-jqqKWgSKX3YaaieqxGhMZymYTeB2HmClbdb3xpmncWsamHIcyDeGdXCsuvrWK4lfsEpyJzerxpnesNS7VjXlJf54AaFJTUWibKvtZWUlj-UKPLu2pcToQWuMsw&e=1726326946&fl=&r=6caa9169-f608-414d-934c-e32c29b7392b-1&k=XsbaEFrzXmiYN8qXXAZ4kg&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=138&s=UH_OWxfs9VMP4M2wiMKw_MDeNCY&cd=i"
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
                <a href="#${section.id}" class="nav-link" data-scroll-target="#${section.id}">
                    ${sectionTitle}
                </a>
            </li>
        `;
    });
}

function initializeProjectFooter() {
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

function loadFooter() {
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
    initializeProjectFooter();
}

// Function to initialize the scroll tracking
function initializeScrollTracking() {
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
function initializeThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        let themeSwitchLabel = document.getElementById("theme-switch-label");
        themeSwitch.addEventListener('change', function () {
            if (themeSwitch.checked) {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                themeSwitchLabel.innerHTML = "Light-Mode"
            } else {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                themeSwitchLabel.innerHTML = "Dark-Mode";
            }
        });
    }
}

// Set the active link based on the current page URL
function setActiveLink(element) {
    // Remove active class from all nav links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the clicked nav link
    element.classList.add('active');
}