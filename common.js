// common.js


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


function loadContentWithDelay(page, placeholder, overlay) {
  // Show the overlay before loading content
  overlay.style.display = 'flex';
  placeholder.style.display = 'none';
  let timeOut_ms = 500;

  fetch(page)
      .then(response => response.text())
      .then(data => {
        placeholder.innerHTML = data;
        setTimeout(() => {
          overlay.style.display = 'none'; // Hide the overlay
          placeholder.style.display = 'block'; // Show the content
        }, timeOut_ms); // 500 milliseconds delay, adjust as needed
      })
      .catch(error => {
        console.error('Error loading content:', error);
        overlay.style.display = 'none';
        placeholder.innerHTML = '<p>Error loading content. Please try again later.</p>';
        placeholder.style.display = 'block';
      });
}

function nameOfTheAuthor(){
  return "Manoj Malviya";
}

const pageEventHandlerName = "loadPageOnMain";

function emitLoadPageEvent(page, event) {
  event.preventDefault();
  const loadPageEvent = new CustomEvent(pageEventHandlerName, { detail: { page: page } });
  document.dispatchEvent(loadPageEvent);
}

function loadSocialMediaLink(identifier) {
  const links = {
    Linkedin: "https://www.linkedin.com/in/manoj-malviya-44700aa4/",
    GitHub: "https://github.com/manoj-malviya-96",
    Instagram: "https://www.instagram.com/manoj_malviya_/",
    Resume: "https://drive.google.com/file/d/1bO2scT5bjixISLEEfXicsK6k-TkwPAHC/view?usp=sharing"
  };

  if (links[identifier]) {
    window.location.href = links[identifier];
  } else {
    console.error("Link not found for identifier:", identifier);
  }
}

// Throttle function
function throttle(fn, ms) {
  let throttle = false;
  let timer;
  return (...args) => {
    if (!throttle) {
      fn.apply(this, args);
      throttle = true;
    } else {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = throttle = false;
      }, ms);
    }
  };
}

// Function to select code lines
function selectCodeLines(annoteEl) {
  const doc = window.document;
  const targetCell = annoteEl.getAttribute("data-target-cell");
  const targetAnnotation = annoteEl.getAttribute("data-target-annotation");
  const annoteSpan = window.document.querySelector(selectorForAnnotation(targetCell, targetAnnotation));
  const lines = annoteSpan.getAttribute("data-code-lines").split(",");
  const lineIds = lines.map((line) => targetCell + "-" + line);
  let top = null;
  let height = null;
  let parent = null;
  if (lineIds.length > 0) {
    const el = window.document.getElementById(lineIds[0]);
    top = el.offsetTop;
    height = el.offsetHeight;
    parent = el.parentElement.parentElement;
    if (lineIds.length > 1) {
      const lastEl = window.document.getElementById(lineIds[lineIds.length - 1]);
      const bottom = lastEl.offsetTop + lastEl.offsetHeight;
      height = bottom - top;
    }
    if (top !== null && height !== null && parent !== null) {
      let div = window.document.getElementById("code-annotation-line-highlight");
      if (div === null) {
        div = window.document.createElement("div");
        div.setAttribute("id", "code-annotation-line-highlight");
        div.style.position = 'absolute';
        parent.appendChild(div);
      }
      div.style.top = top - 2 + "px";
      div.style.height = height + 4 + "px";
      div.style.left = 0;
      let gutterDiv = window.document.getElementById("code-annotation-line-highlight-gutter");
      if (gutterDiv === null) {
        gutterDiv = window.document.createElement("div");
        gutterDiv.setAttribute("id", "code-annotation-line-highlight-gutter");
        gutterDiv.style.position = 'absolute';
        const codeCell = window.document.getElementById(targetCell);
        const gutter = codeCell.querySelector('.code-annotation-gutter');
        gutter.appendChild(gutterDiv);
      }
      gutterDiv.style.top = top - 2 + "px";
      gutterDiv.style.height = height + 4 + "px";
    }
    selectedAnnoteEl = annoteEl;
  }
}

// Function to unselect code lines
function unselectCodeLines() {
  const elementsIds = ["code-annotation-line-highlight", "code-annotation-line-highlight-gutter"];
  elementsIds.forEach((elId) => {
    const div = window.document.getElementById(elId);
    if (div) {
      div.remove();
    }
  });
  selectedAnnoteEl = undefined;
}