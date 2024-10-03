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
            toggleBtn: window.document.getElementById('toggle-music-hud')
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

        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        // this.extractMetadata(file);
        this.audio.addEventListener('timeupdate', this.updateSlider.bind(this));
        this.audio.addEventListener('ended', this.resetAudio.bind(this));

        this.drawVisualizer();
    }

    drawVisualizer() {
        this.drawBarChartVisualizer()
    }

    // Draw the visualizer on the canvas
    drawBarChartVisualizer() {
        const numBars = this.bufferLength;
        const barWidth = this.elements.canvas.width / numBars;
        const maxBarHeight = this.elements.canvas.height / 3;
        const fftSize = this.analyser.fftSize;

        const draw = () => {
            requestAnimationFrame(draw);
            this.analyser.getByteFrequencyData(this.dataArray);

            this.canvasCtx.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);
            const centerY = this.elements.canvas.height / 2;

            for (let i = 0; i < numBars; i++) {
                const freqIndex = Math.floor(i * (this.bufferLength / numBars));
                const barHeight = (this.dataArray[freqIndex] / fftSize) * maxBarHeight;
                const x = i * barWidth;

                this.canvasCtx.fillStyle = `${this.primaryColor}`;
                this.canvasCtx.fillRect(x, centerY - barHeight, barWidth - 2, barHeight);  // Upper bar
                this.canvasCtx.fillRect(x, centerY, barWidth - 2, barHeight);  // Lower bar
            }
        };

        draw();
    }

    // Toggle music HUD visibility
    toggleMusicHud() {
        const hud = window.document.querySelector('.app-header');
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
    const app = new MusicApp();
}

function createPlotsForDfam() {
    createHeatmap('heatmap1', ['Design Prompt', 'Add Material', 'Remove Material', 'Editing'], ['S1', 'S2', 'S3', 'S4'], [[0.91, 0, 0.08, 0], [0.88, 0, 0, 0.12], [0.23, 0, 0.53, 0.23], [0.08, 0.17, 0.67, 0.08]], "Analysis of the design process in Dfam", "Design Step", "States",);
    createHeatmap('heatmap2', ['S1', 'S2', 'S3', 'S4'], ['S1', 'S2', 'S3', 'S4'], [[0.05, 0.91, 0.03, 0], [0.75, 0.07, 0.05, 0.13], [0, 0.03, 0, 0.92], [0.01, 0.02, 0.65, 0.32]], "Transition Probabilities in Dfam", "From State", "To State",);
}


function createPlotsForDeltaDesign() {
    console.log("Creating plots for delta design");

    createHeatmap('heatmap1', ["Add UP Delta", "Add DOWN Delta", "Add Anchor", "Move", "Fine Control", "Flip", "Color", "Delete", "End Study"], ['S1', 'S2', 'S3', 'S4'], [[0.28, 0.27, 0.02, 0.02, 0.03, 0.04, 0.04, 0.00, 0.35],  // S1
        [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],  // S2
        [0.00, 0.95, 0.00, 0.01, 0.00, 0.01, 0.79, 0.01, 0.02],  // S3
        [0.65, 0.00, 0.05, 0.00, 0.01, 0.10, 0.84, 0.00, 0.89]   // S4
    ], "Analysis of the design process in Delta Design", "Design Step", "States",)
    createHeatmap('heatmap2', ['S1', 'S2', 'S3', 'S4'], ['S1', 'S2', 'S3', 'S4'], [[0.65, 0.00, 0.02, 0.33],  // S1 -> S1, S2, S3, S4
        [0.01, 0.79, 0.00, 0.09],  // S2 -> S1, S2, S3, S4
        [0.04, 0.01, 0.84, 0.02],  // S3 -> S1, S2, S3, S4
        [0.01, 0.00, 0.01, 0.89]   // S4 -> S1, S2, S3, S4
    ], "Transition Probabilities in Delta Design", "From State", "To State",)
}