
function initMusicApp() {
    const fileUpload = document.getElementById('fileUpload');
    const canvas = document.getElementById('visualizer');
    const canvasCtx = canvas.getContext('2d');
    const progressBar = document.getElementById('progressBar');
    const songTitle = document.getElementById('songTitle');
    const timeCurrent = document.getElementById('timeCurrent');
    const timeEnd = document.getElementById('timeEnd');
    const playPauseBtn = document.getElementById('playPauseBtn');

    let audioContext;
    let analyser;
    let source;
    let bufferLength;
    let dataArray;
    let audio;
    let duration;
    let isPlaying = false;

    fileUpload.addEventListener('change', handleFileUpload);
    progressBar.addEventListener('input', updateProgress);
    playPauseBtn.addEventListener('click', togglePlayPause);

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (audio) {
            audio.pause();
            audioContext.close();
        }

        audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.load();

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();

        source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        // Extract song metadata using jsmediatags
        jsmediatags.read(file, {
            onSuccess: function (tag) {
                const {title, artist, album} = tag.tags;
                songTitle.textContent = title + ' | ' + artist + ' | ' + album;
            },
            onError: function (error) {
                console.log('Error reading metadata:', error);
            }
        });

        audio.addEventListener('timeupdate', updateSlider);
        audio.addEventListener('ended', () => {
            progressBar.value = 0;
            isPlaying = false;
        });

        drawGridVisualizer();
    }

    function togglePlayPause() {
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        if (isPlaying) {
            this.innerHTML = '<i class="bi bi-play-fill"></i>';
        } else {
            this.innerHTML = '<i class="bi bi-pause-fill"></i>';
        }
        isPlaying = !isPlaying;

    }

    function updateSlider() {
        const currentTime = audio.currentTime;
        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
        const totalMinutes = Math.floor(audio.duration / 60);
        const totalSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');

        timeCurrent.textContent = `${currentMinutes}:${currentSeconds}`;
        timeEnd.textContent = `${!isNaN(totalMinutes) ? totalMinutes : 0}:${!isNaN(totalSeconds) ? totalSeconds : .00}`;
        progressBar.value = (currentTime / audio.duration) * 100;
    }

    function updateProgress() {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }

    function drawGridVisualizer() {
        const numRings = 10;  // Number of concentric rings
        const pointsPerRing = 20;  // Points per ring (can be dynamic based on radius)
        const maxRadius = canvas.width / 2.5;  // Maximum distance from the center
        const pointPadding = 10;  // Padding between points

        function draw() {
            requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Loop through each concentric ring
            for (let ring = 1; ring <= numRings; ring++) {
                const ringRadius = (ring / numRings) * maxRadius;
                const numPointsInRing = Math.floor(pointsPerRing * ring);  // Increase points in outer rings

                // Loop through each point in the ring
                for (let i = 0; i < numPointsInRing; i++) {
                    const index = Math.floor((i + ring) % bufferLength);
                    const frequency = dataArray[index];
                    const intensity = frequency / 255;

                    // Calculate the angle for this point
                    const angle = (i / numPointsInRing) * Math.PI * 2;

                    // Calculate the position of the point on the ring
                    const x = centerX + Math.cos(angle) * ringRadius;
                    const y = centerY + Math.sin(angle) * ringRadius;

                    // Set point size and brightness
                    const pointSize = intensity * 6 + pointPadding;  // Adjust size with padding
                    const brightness = 1 - (ringRadius / maxRadius);
                    const opacity = intensity * brightness;

                    // Draw circular point
                    canvasCtx.beginPath();
                    canvasCtx.arc(x, y, pointSize, 0, Math.PI * 2);
                    canvasCtx.fillStyle = `rgba(${255 * intensity}, ${100 * brightness}, ${255 * brightness}, ${opacity})`;
                    canvasCtx.fill();
                }
            }
        }

        draw();
    }
}


function createPlotsForDfam() {
    createHeatmap('heatmap1',
        ['Design Prompt', 'Add Material', 'Remove Material', 'Editing'],
        ['S1', 'S2', 'S3', 'S4'],
        [[0.91, 0, 0.08, 0], [0.88, 0, 0, 0.12], [0.23, 0, 0.53, 0.23], [0.08, 0.17, 0.67, 0.08]],
        "Analysis of the design process in Dfam",
        "Design Step",
        "States",
    );
    createHeatmap('heatmap2',
        ['S1', 'S2', 'S3', 'S4'],
        ['S1', 'S2', 'S3', 'S4'],
        [[0.05, 0.91, 0.03, 0], [0.75, 0.07, 0.05, 0.13], [0, 0.03, 0, 0.92], [0.01, 0.02, 0.65, 0.32]],
        "Transition Probabilities in Dfam",
        "From State",
        "To State",
    );
}


function createPlotsForDeltaDesign() {
    console.log("Creating plots for delta design");

    createHeatmap('heatmap1',
        ["Add UP Delta", "Add DOWN Delta", "Add Anchor", "Move", "Fine Control", "Flip", "Color", "Delete", "End Study"],
        ['S1', 'S2', 'S3', 'S4'],
        [
            [0.28, 0.27, 0.02, 0.02, 0.03, 0.04, 0.04, 0.00, 0.35],  // S1
            [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],  // S2
            [0.00, 0.95, 0.00, 0.01, 0.00, 0.01, 0.79, 0.01, 0.02],  // S3
            [0.65, 0.00, 0.05, 0.00, 0.01, 0.10, 0.84, 0.00, 0.89]   // S4
        ],
        "Analysis of the design process in Delta Design",
        "Design Step",
        "States",
    )
    createHeatmap('heatmap2',
        ['S1', 'S2', 'S3', 'S4'],
        ['S1', 'S2', 'S3', 'S4'],
        [
            [0.65, 0.00, 0.02, 0.33],  // S1 -> S1, S2, S3, S4
            [0.01, 0.79, 0.00, 0.09],  // S2 -> S1, S2, S3, S4
            [0.04, 0.01, 0.84, 0.02],  // S3 -> S1, S2, S3, S4
            [0.01, 0.00, 0.01, 0.89]   // S4 -> S1, S2, S3, S4
        ],
        "Transition Probabilities in Delta Design",
        "From State",
        "To State",
    )
}