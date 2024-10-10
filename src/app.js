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
