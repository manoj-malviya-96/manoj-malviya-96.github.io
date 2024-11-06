const skipTime_s = 10; // Skip time in seconds

class MusicVizView {
  constructor() {
    this.elements = this.getDomElements();
    if (!this.elements.canvas) return;

    this.elements.canvas.height = appWindowHeight;
    this.elements.canvas.width = appWindowWidth;

    this.canvasCtx = this.elements.canvas.getContext("2d");
    this.audioContext = null;
    this.analyser = null;
    this.bufferLength = null;
    this.dataArray = null;
    this.audio = null;
    this.isPlaying = false;
    this.selectedVisualizer = "circles";

    this.init();
  }

  // Get all the required DOM elements
  getDomElements() {
    return {
      appWindow: window.document.querySelector(".app-window"),
      appController: window.document.querySelector(".app-controller"),
      fileUpload: window.document.getElementById("fileUpload"),
      songDropdown: window.document.getElementById("songDropdown"),
      canvas: window.document.getElementById("visualizer"),
      progressBar: window.document.getElementById("progressBar"),
      songTitle: window.document.getElementById("songTitle"),
      timeInfo: window.document.getElementById("timeInfo"),
      playPauseBtn: window.document.getElementById("playPauseBtn"),
      skipForwardBtn: window.document.getElementById("skipForwardBtn"),
      skipBackwardBtn: window.document.getElementById("skipBackwardBtn"),
      toggleBtn: window.document.getElementById("toggleMusicHud"),
      toggleFullScreenBtn: window.document.getElementById(
        "toggleFullScreenBtn",
      ),
      vizDropdown: window.document.getElementById("vizDropdown"),
    };
  }

  // Initialize the app
  init() {
    this.elements.fileUpload.addEventListener(
      "change",
      this.handleFileUpload.bind(this),
    );
    this.elements.progressBar.addEventListener(
      "input",
      this.updateProgress.bind(this),
    );
    this.elements.playPauseBtn.addEventListener(
      "click",
      this.togglePlayPause.bind(this),
    );
    this.elements.toggleBtn.addEventListener(
      "click",
      this.toggleMusicHud.bind(this),
    );
    this.elements.toggleFullScreenBtn.addEventListener(
      "click",
      this.toggleFullScreen.bind(this),
    );
    this.elements.skipForwardBtn.addEventListener(
      "click",
      this.skipForward.bind(this),
    );
    this.elements.skipBackwardBtn.addEventListener(
      "click",
      this.skipBackward.bind(this),
    );

    setupDropdown(
      this.elements.vizDropdown,
      this.handleVizDropdownSelect.bind(this),
    );

    setupDropdown(
      this.elements.songDropdown,
      this.handleSongDropdownSelect.bind(this),
    );

    this.setupResizing();
    this.setupKeyboardShortcuts();

    initThemeChangeHandler(() => this.updateProgressBarStyle());
    this.updateProgressBarStyle();
  }

  updateProgressBarStyle() {
    const backgroundColor = getContrastColor();
    if (this.isPlaying) {
      this.elements.progressBar.style.background = `linear-gradient(to right, 
                                                            ${brandColor} ${this.elements.progressBar.value}%,  
                                                            ${backgroundColor} ${this.elements.progressBar.value}%)`;
    } else {
      this.elements.progressBar.style.background = `${backgroundColor}`;
    }
  }

  setupKeyboardShortcuts() {
    window.document.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  handleKeydown(event) {
    event.preventDefault(); // Prevent default behavior of keys

    // Check if the space key is pressed (keyCode 32 or ' ')
    if (event.code === "Space") {
      this.togglePlayPause();
    }

    // Check if the Enter key is pressed (keyCode 13 or 'Enter')
    if (event.code === "Enter" || event.code === "KeyF") {
      this.toggleFullScreen();
    }

    // Handle arrow keys for skipping
    if (event.code === "ArrowRight") {
      this.skipForward(); // Call the skip forward method
    }

    if (event.code === "ArrowLeft") {
      this.skipBackward(); // Call the skip backward method
    }

    // Handle arrow keys for skipping
    if (event.code === "ArrowDown") {
      this.hideMusicHud();
    }

    if (event.code === "ArrowUp") {
      this.showMusicHud();
    }
  }

  handleVizDropdownSelect(selectedViz) {
    // update the selected visualizer
    this.selectedVisualizer = selectedViz;
    // Trigger the visualizer change based on selection
    this.stopVisualizer();
    this.drawVisualizer();
  }

  handleSongDropdownSelect(selectedSong) {
    this.resetAudio();
    this.setupNewAudio(selectedSong);
    // Get selected song's name
    this.elements.songTitle.textContent = event.target.innerHTML;
    this.togglePlayPause();
  }

  toggleFullScreen() {
    if (
      !this.elements.appWindow.classList.contains("full-screen-modal") &&
      !document.fullscreenElement
    ) {
      this.elements.appWindow.requestFullscreen();
    } else if (window.document.exitFullscreen) {
      window.document.exitFullscreen();
    }
  }

  setupResizing() {
    window.document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement === this.elements.appWindow) {
        this.elements.appWindow.classList.add("full-screen-modal");
        this.elements.toggleFullScreenBtn.innerHTML =
          '<i class="bi bi-fullscreen-exit"></i>'; // Change icon for full-screen
        this.hideMusicHud(); // Hide the music HUD when exiting full-screen
      } else {
        this.elements.appWindow.classList.remove("full-screen-modal");
        this.elements.toggleFullScreenBtn.innerHTML =
          '<i class="bi bi-arrows-fullscreen"></i>'; // Change icon when exiting full-screen
        this.showMusicHud(); // Hide the music HUD when exiting full-screen
      }
    });
  }

  // Handle file upload and setting up the audio context and visualizer
  handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    this.resetAudio();

    try {
      const fileURL = URL.createObjectURL(file);
      this.setupNewAudio(fileURL);
      this.extractMetadata(file);
    } catch (error) {
      console.error("Error loading audio", error);
    }

    this.togglePlayPause();
  }

  // Toggle play/pause for the audio
  togglePlayPause() {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.pauseAudio();
    } else {
      this.playAudio();
    }
  }

  // Skip forward 30 seconds
  skipForward() {
    if (!this.audio) return;
    this.audio.currentTime = Math.min(
      this.audio.duration,
      this.audio.currentTime + skipTime_s,
    );
  }

  // Skip backward 30 seconds
  skipBackward() {
    if (!this.audio) return;
    this.audio.currentTime = Math.max(0, this.audio.currentTime - skipTime_s);
  }

  // Update progress bar and time info
  updateSlider() {
    const currentTime = this.audio.currentTime;
    const totalDuration = this.audio.duration;
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60)
      .toString()
      .padStart(2, "0");
    const totalMinutes = Math.floor(totalDuration / 60);
    const totalSeconds = Math.floor(totalDuration % 60)
      .toString()
      .padStart(2, "0");

    const timeCurrent = `${currentMinutes}:${currentSeconds} `;
    const timeTotal = `${!isNaN(totalMinutes) ? totalMinutes : 0}:${!isNaN(totalSeconds) ? totalSeconds : "00"}`;

    this.elements.timeInfo.textContent = timeCurrent + " / " + timeTotal;
    this.elements.progressBar.value = (currentTime / totalDuration) * 100;
    this.updateProgressBarStyle();
  }

  // Update progress when the user interacts with the progress bar
  updateProgress() {
    this.audio.currentTime =
      (this.elements.progressBar.value / 100) * this.audio.duration;
  }

  // Reset the audio, stop playback, and reset the UI
  resetAudio() {
    if (this.audio) {
      this.audio.pause();
      if (this.audioContext) {
        this.audioContext.close();
      }
      this.elements.progressBar.value = 0;
      this.elements.timeInfo.textContent = "0:00 / 0:00";
      this.elements.progressBar.style.background = `${this.backgroundColor}`;
    }
    this.isPlaying = false;
    this.updatePlayButton();
  }

  // Play the audio
  playAudio() {
    this.audio.play();
    this.isPlaying = true;
    this.updatePlayButton();
    this.resumeVisualizer();
  }

  // Pause the audio
  pauseAudio() {
    this.audio.pause();
    this.isPlaying = false;
    this.updatePlayButton();
    this.stopVisualizer();
  }

  // Setup a new audio file and initialize the visualizer
  setupNewAudio(fileURL) {
    this.audio = new Audio();
    this.audio.src = fileURL;
    this.audio.load();

    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();

    const source = this.audioContext.createMediaElementSource(this.audio);
    source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.analyser.fftSize = 256; // Number of bins for frequency analysis
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.audio.addEventListener("timeupdate", this.updateSlider.bind(this));
    this.audio.addEventListener("ended", this.resetAudio.bind(this));
    this.drawVisualizer();
  }

  drawVisualizer() {
    if (!this.audio) {
      console.error("No audio context");
      return;
    }
    this.stopVisualizer();

    switch (this.selectedVisualizer) {
      case "circles":
        this.drawCircleGridVisualizer();
        break;
      case "bars":
        this.drawBarChartVisualizer();
        break;
      case "spiral":
        this.drawSpiralVisualizer();
        break;
      default:
        this.drawBarChartVisualizer();
        break;
    }
  }

  stopVisualizer() {
    // Cancel the previous animation frame before starting a new one
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  resumeVisualizer() {
    if (this.animationFrameId) {
      requestAnimationFrame(this.drawVisualizer.bind(this));
    }
  }

  getCanvasCenterAndDimensions() {
    const canvasWidth = this.elements.canvas.width;
    const canvasHeight = this.elements.canvas.height;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    return { canvasWidth, canvasHeight, centerX, centerY };
  }

  // Draw the visualizer on the canvas
  drawBarChartVisualizer() {
    const numBars = this.bufferLength / 2;
    const barWidth = this.elements.canvas.width / numBars;
    const maxBarHeight = this.elements.canvas.height / 4;
    const fftSize = this.analyser.fftSize; // Maximum intensity

    const { canvasWidth, canvasHeight, centerX, centerY } =
      this.getCanvasCenterAndDimensions();

    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(this.dataArray);

      this.canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let i = 0; i < numBars; i++) {
        const freqIndex = Math.floor(i * (this.bufferLength / numBars));
        const randomFactor = Math.random();
        const intensity =
          0.921 * (this.dataArray[freqIndex] / fftSize) ** 2 +
          0.069 * randomFactor;

        const barHeight = intensity * maxBarHeight;
        const px = centerX + i * barWidth;
        const nx = centerX - i * barWidth;

        this.canvasCtx.fillStyle = adjustColor(randomColor(), intensity, 1);

        this.canvasCtx.fillRect(
          px,
          centerY - barHeight,
          barWidth - 2,
          barHeight,
        ); // Positive Upper bar
        this.canvasCtx.fillRect(px, centerY, barWidth - 2, barHeight); // Positive Lower bar
        this.canvasCtx.fillRect(
          nx,
          centerY - barHeight,
          barWidth - 2,
          barHeight,
        ); // Negative Upper Bar
        this.canvasCtx.fillRect(nx, centerY, barWidth - 2, barHeight); // Negative Lower Bar
      }
    };

    draw();
  }

  drawCircleGridVisualizer() {
    const circleRadius = 4; // Radius of the circles
    const spacingFactor = 10; // Factor to add spacing between circles

    // Calculate spacings based on hexagon geometry with additional spacing
    const xSpacing = circleRadius * 1.5 * spacingFactor;
    const ySpacing = (circleRadius * Math.sqrt(3) * spacingFactor) / 2;
    const maxRange = 21; // Adjust as needed for coverage
    const maxDistance = maxRange * 3 + 1; // Max distance for mapping

    const { canvasWidth, canvasHeight, centerX, centerY } =
      this.getCanvasCenterAndDimensions();

    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(this.dataArray);

      this.canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let n = 0; n <= maxRange; n++) {
        for (let i = 0; i <= n; i++) {
          // Iterate in a circular fashion by finding all points on the "ring" of distance n
          const directions = [
            [i, n - i],
            [-i, n - i],
            [i, -(n - i)],
            [-i, -(n - i)],
            [n - i, i],
            [-(n - i), i],
            [n - i, -i],
            [-(n - i), -i],
          ];

          directions.forEach(([row, col]) => {
            // Calculate the position relative to center
            const distanceFromCenter = Math.abs(row) + Math.abs(col);

            // Map frequency data so that bass is closer to center
            const dataIndex = Math.floor(
              (distanceFromCenter / maxDistance) * this.bufferLength,
            );
            const intensity =
              this.dataArray[dataIndex % this.bufferLength] / 255; // Normalize intensity
            const factor = intensity ** 2;

            const glow = factor * 21;
            const size = 2 * circleRadius * factor;

            // Adjust x position for offset in odd rows
            const offsetX = (row % 2) * (xSpacing / 2);

            const x = centerX + col * xSpacing + offsetX;
            const y = centerY + row * ySpacing;
            const color = factor > 0.47 ? randomColor() : brandColor;

            this.canvasCtx.fillStyle = adjustColor(
              color,
              intensity,
              0.75 * (1 + intensity),
            );

            // Draw the circle with shadow for glow effect
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(x, y, size, 0, Math.PI * 2, false);
            this.canvasCtx.shadowBlur = glow;
            this.canvasCtx.shadowColor = adjustColor(
              color,
              intensity,
              0.5 * (1 + intensity),
            );
            this.canvasCtx.fill();
            this.canvasCtx.closePath();
          });
        }
      }
    };

    draw();
  }

  drawSpiralVisualizer() {
    // Parameters for the spiral
    let angle = 0;
    let points = []; // Stores current visible points
    let globalFactor = 1; // Global factor to dropyness
    let totalPoints = 0; // Counter to keep track of points generated

    const usualRadius = 9;
    const maxGlow = 69; // Max glow intensity
    const padding = 27; // Padding to keep points in view

    // Set the canvas dimensions and get the Fibonacci generator
    const { canvasWidth, canvasHeight, centerX, centerY } =
      this.getCanvasCenterAndDimensions();
    const fibGenerator = new FibonacciGenerator(); // Create Fibonacci sequence generator

    // Function to add a new Fibonacci point
    const addNewFibonacciPoint = (radius) => {
      const fibRadius = fibGenerator.next() * 3; // Scale the Fibonacci radius
      const angleOffset = totalPoints * 0.5; // Angle spacing for points

      points.push({
        x: fibRadius * Math.cos(angleOffset),
        y: fibRadius * Math.sin(angleOffset),
        r: radius, // Start with initial radius
        angle: angleOffset, // Save angle for future movement
      });
    };

    // Function to update the position of each point
    function updatePoint(point) {
      point.r *= 1.0069; // Expand the radius over time
      point.x = padding * point.r * Math.cos(point.angle); // Update x position
      point.y = padding * point.r * Math.sin(point.angle); // Update y position
    }

    // Function to draw each point
    const drawPoint = (point, index) => {
      const { x, y, r } = point;

      // Get the intensity from audio data
      const intensity =
        this.dataArray[(totalPoints - index) % this.bufferLength] / 255;
      const factor = intensity ** 3;
      const glow = factor * maxGlow;

      globalFactor = Math.max(globalFactor, factor); // Update global factor

      // Draw a circle with a glow effect based on audio intensity
      this.canvasCtx.beginPath();
      this.canvasCtx.arc(x, y, r, 0, Math.PI * 2);

      const color = factor > 0.47 ? randomColor() : this.primaryColor;
      const drawColor = adjustColor(color, factor, 1 + factor);

      // Add shadow for glow effect
      this.canvasCtx.shadowBlur = glow;
      this.canvasCtx.shadowColor = drawColor;

      this.canvasCtx.fillStyle = drawColor;
      //Fill the circle
      this.canvasCtx.fill();
    };

    // Main draw loop
    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw); // Loop the drawing

      // Get audio frequency data
      this.analyser.getByteFrequencyData(this.dataArray);

      // Clear the canvas and prepare for drawing
      this.canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      this.canvasCtx.save();
      this.canvasCtx.translate(centerX, centerY); // Move origin to center
      this.canvasCtx.rotate(angle); // Apply rotation

      // Draw and update each point
      points.forEach((point, index) => {
        drawPoint.call(this, point, index); // Draw the point with glow
        updatePoint(point); // Update the position
      });

      // Remove points that are out of view
      points = points.filter((point) => point.r < canvasWidth * 1.5);
      addNewFibonacciPoint(usualRadius); // Add a new point
      totalPoints++;

      // Restore canvas state and adjust angle for rotation
      this.canvasCtx.restore();
      angle += globalFactor * 0.01; // Increment rotation angle
    };

    draw(); // Start the drawing loop
  }

  // Toggle music HUD visibility
  toggleMusicHud() {
    this.elements.appController.classList.toggle("hidden");
    this.elements.toggleBtn.innerHTML =
      this.elements.appController.classList.contains("hidden")
        ? '<i class="bi bi-chevron-compact-up"></i>'
        : '<i class="bi bi-chevron-compact-down"></i>';
  }

  showMusicHud() {
    if (this.elements.appController.classList.contains("hidden")) {
      this.toggleMusicHud();
    }
  }

  hideMusicHud() {
    if (!this.elements.appController.classList.contains("hidden")) {
      this.toggleMusicHud();
    }
  }

  // Update the play/pause button based on the current state
  updatePlayButton() {
    this.elements.playPauseBtn.innerHTML = this.isPlaying
      ? '<i class="bi bi-pause-fill"></i>'
      : '<i class="bi bi-play-fill"></i>';
  }

  // Extract metadata from the uploaded file
  extractMetadata(file) {
    if (!jsmediatags) {
      console.error("jsmediatags lib not loaded");
      return;
    }
    jsmediatags.read(file, {
      onSuccess: (tag) => {
        let metadataString;
        const { title, artist, album } = tag.tags;

        if (!title) {
          metadataString = file.name.split(".")[0];
        } else {
          metadataString =
            title +
            (artist ? ` |  ${artist}` : "") +
            (album ? `| (${album})` : "");
        }

        this.elements.songTitle.textContent = metadataString;
      },
      onError: (error) => {
        console.error("Error reading metadata:", error);
      },
    });
  }
}
