// Todo move this music-app api
class MusicApp {
    constructor() {
        this.elements = this.getDomElements();
        if (!this.elements.canvas) return;

        this.canvasCtx = this.elements.canvas.getContext('2d');
        this.audioContext = null;
        this.analyser = null;
        this.bufferLength = null;
        this.dataArray = null;
        this.audio = null;
        this.isPlaying = false;

        this.init();

        this.primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-brand-primary');
        this.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-passive-element');
    }

    // Initialize the app
    init() {
        this.elements.fileUpload.addEventListener('change', this.handleFileUpload.bind(this));
        this.elements.progressBar.addEventListener('input', this.updateProgress.bind(this));
        this.elements.playPauseBtn.addEventListener('click', this.togglePlayPause.bind(this));
        this.elements.toggleBtn.addEventListener('click', this.toggleMusicHud.bind(this));
        this.elements.vizDropdown.addEventListener('change', this.drawVisualizer.bind(this))
        this.elements.progressBar.style.background = `${this.backgroundColor}`;
    }

    // Get all the required DOM elements
    getDomElements() {
        return {
            fileUpload: window.document.getElementById('fileUpload'),
            canvas: window.document.getElementById('visualizer'),
            progressBar: window.document.getElementById('progressBar'),
            songTitle: window.document.getElementById('songTitle'),
            timeInfo: window.document.getElementById('timeInfo'),
            playPauseBtn: window.document.getElementById('playPauseBtn'),
            toggleBtn: window.document.getElementById('toggle-music-hud'),
            vizDropdown: window.document.getElementById('viz-dropdown'),
        };
    }


    // Handle file upload and setting up the audio context and visualizer
    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.resetAudio();
        this.setupNewAudio(file);
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

    // Update progress bar and time info
    updateSlider() {
        const currentTime = this.audio.currentTime;
        const totalDuration = this.audio.duration;
        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
        const totalMinutes = Math.floor(totalDuration / 60);
        const totalSeconds = Math.floor(totalDuration % 60).toString().padStart(2, '0');

        this.elements.timeInfo.textContent = `${currentMinutes}:${currentSeconds} / ${!isNaN(totalMinutes) ? totalMinutes : 0}:${!isNaN(totalSeconds) ? totalSeconds : '00'}`;
        this.elements.progressBar.value = (currentTime / totalDuration) * 100;

        this.elements.progressBar.style.background = `linear-gradient(to right, 
                                                        ${this.primaryColor} ${this.elements.progressBar.value}%,  
                                                        ${this.backgroundColor} ${this.elements.progressBar.value}%)`;
    }

    // Update progress when the user interacts with the progress bar
    updateProgress() {
        this.audio.currentTime = (this.elements.progressBar.value / 100) * this.audio.duration;
    }

    // Reset the audio, stop playback, and reset the UI
    resetAudio() {
        if (this.audio) {
            this.audio.pause();
            if (this.audioContext) {
                this.audioContext.close();
            }
            this.elements.progressBar.value = 0;
            this.elements.timeInfo.textContent = '0:00 / 0:00';
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
    }

    // Pause the audio
    pauseAudio() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
    }

    // Setup a new audio file and initialize the visualizer
    setupNewAudio(file) {
        this.audio = new Audio();
        this.audio.src = URL.createObjectURL(file);
        this.audio.load();

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();

        const source = this.audioContext.createMediaElementSource(this.audio);
        source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        this.analyser.fftSize = 256; // Number of bins for frequency analysis
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        try {
            this.extractMetadata(file);
        }
        catch (error) {
            console.error("Error extracting metadata", error);
        }
        this.audio.addEventListener('timeupdate', this.updateSlider.bind(this));
        this.audio.addEventListener('ended', this.resetAudio.bind(this));
        this.drawVisualizer();
    }

    drawVisualizer() {
        if (!this.audio){
            console.error("No audio context");
            return ;
        }
        const vis = this.elements.vizDropdown.value;
        switch (vis){
            case 'circles':
                this.drawCircleGridVisualizer();
                break;
            case 'bars':
                this.drawBarChartVisualizer();
                break;
            default:
                this.drawBarChartVisualizer();
                break;
        }
    }

    // Draw the visualizer on the canvas
    drawBarChartVisualizer() {
        const numBars = this.bufferLength / 2;
        const barWidth = this.elements.canvas.width / numBars;
        const maxBarHeight = this.elements.canvas.height / 4;
        const fftSize = this.analyser.fftSize; // Maximum intensity

        const centerX =  this.elements.canvas.width / 2;
        const centerY = this.elements.canvas.height / 2;

        const draw = () => {
            requestAnimationFrame(draw);
            this.analyser.getByteFrequencyData(this.dataArray);

            this.canvasCtx.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);


            for (let i = 0; i < numBars; i++) {
                const freqIndex = Math.floor(i * (this.bufferLength / numBars));
                const randomFactor = Math.random();
                const intensity=  0.921*(this.dataArray[freqIndex] / fftSize)**2 + 0.069*randomFactor;

                const barHeight =  intensity * maxBarHeight;
                const px = centerX + i * barWidth;
                const nx = centerX - i * barWidth;

                // this.canvasCtx.fillStyle = `${this.primaryColor}`;
                this.canvasCtx.fillStyle = adjustColor(this.primaryColor, intensity, 1)

                this.canvasCtx.fillRect(px, centerY - barHeight, barWidth - 2, barHeight);  // Positive Upper bar
                this.canvasCtx.fillRect(px, centerY, barWidth - 2, barHeight);  // Positive Lower bar
                this.canvasCtx.fillRect(nx, centerY - barHeight, barWidth - 2, barHeight);  // Negative Upper Bar
                this.canvasCtx.fillRect(nx, centerY, barWidth - 2, barHeight);  // Negative Lower Bar
            }
        };

        draw();
    }

    drawCircleGridVisualizer() {
        const circleRadius = 4; // Radius of the circles
        const spacingFactor = 10; // Factor to add spacing between circles

        // Calculate spacings based on hexagon geometry with additional spacing
        const xSpacing = circleRadius * 1.5 * spacingFactor;
        const ySpacing = circleRadius * Math.sqrt(3) * spacingFactor / 2;
        const maxRange = 20; // Adjust as needed for coverage

        const canvasWidth = this.elements.canvas.width;
        const canvasHeight = this.elements.canvas.height;

        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        const draw = () => {
            requestAnimationFrame(draw);
            this.analyser.getByteFrequencyData(this.dataArray);

            this.canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

            for (let n = 0; n <= maxRange; n++) {
                for (let i = 0; i <= n; i++) {
                    // Iterate in a circular fashion by finding all points on the "ring" of distance n
                    const directions = [
                        [i, n - i], [-i, n - i], [i, -(n - i)], [-i, -(n - i)],
                        [n - i, i], [-(n - i), i], [n - i, -i], [-(n - i), -i]
                    ];

                    directions.forEach(([row, col]) => {
                        // Calculate the position relative to center
                        const distanceFromCenter = Math.abs(row) + Math.abs(col);

                        // Map frequency data so that bass is closer to center
                        const maxDistance = (maxRange * 2 + 1); // Max distance for mapping
                        const dataIndex = Math.floor((distanceFromCenter / maxDistance) * this.bufferLength);
                        const intensity = this.dataArray[dataIndex % this.bufferLength] / 255; // Normalize intensity
                        const factor = intensity ** 3;

                        const glow = factor * 21;
                        const size = 2 * circleRadius * factor;

                        // Adjust x position for offset in odd rows
                        const offsetX = (row % 2) * (xSpacing / 2);

                        const x = centerX + col * xSpacing + offsetX;
                        const y = centerY + row * ySpacing;

                        this.canvasCtx.fillStyle = adjustColor(this.primaryColor, intensity, 0.75* (1 + intensity));

                        // Draw the circle with shadow for glow effect
                        this.canvasCtx.beginPath();
                        this.canvasCtx.arc(x, y, size, 0, Math.PI * 2, false);
                        this.canvasCtx.shadowBlur = glow;
                        this.canvasCtx.shadowColor = adjustColor(this.primaryColor, intensity, 0.5 * (1 + intensity));
                        this.canvasCtx.fill();
                        this.canvasCtx.closePath();
                    });
                }
            }
        };

        draw();
    }





    // Toggle music HUD visibility
    toggleMusicHud() {
        const hud = window.document.querySelector('.app-controller');
        hud.classList.toggle('hidden');
        this.elements.toggleBtn.innerHTML = hud.classList.contains('hidden') ?
                                            '<i class="bi bi-chevron-compact-down"></i>' :
                                            '<i class="bi bi-chevron-compact-up"></i>';
    }
    // Update the play/pause button based on the current state
    updatePlayButton() {
        this.elements.playPauseBtn.innerHTML = this.isPlaying ?
                                                '<i class="bi bi-pause"></i>' : '<i class="bi bi-play"></i>';
    }


    // Extract metadata from the uploaded file
    extractMetadata(file) {
        if (!jsmediatags){
            console.error("jsmediatags lib not loaded")
            return ;
        }
        jsmediatags.read(file, {
            onSuccess: (tag) => {
                const {title, artist, album} = tag.tags;
                this.elements.songTitle.textContent = title + ' | ' + artist + ' | ' + album;
            }, onError: (error) => {
                console.log('Error reading metadata:', error);
            }
        });
    }
}

function initMusicApp() {
    window.musicApp = new MusicApp();
}


function handleRunningApps() {
    // Pause the music app if it exists before loading new content
    console.log("Handling running apps");
    if (window.musicApp) {
        window.musicApp.resetAudio();
    }
}