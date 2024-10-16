function initMusicApp() {
  window.musicApp = new MusicApp();
}

function handleRunningApps() {
  // Pause the music app if it exists before loading new content
  if (window.musicApp) {
    window.musicApp.resetAudio();
  }
  if (window.meshaMorph) {
    window.meshaMorph = null;
  }
}

function initMeshMorph() {
  window.meshaMorph = new MeshView();
  window.meshaMorph.animate();
}
