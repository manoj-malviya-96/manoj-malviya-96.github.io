
const appWindowWidth = getSizeFromStyle('--app-window-width');
const appWindowHeight = getSizeFromStyle('--app-window-height');

function initMusicApp() {
  window.musicApp = new MusicApp();
}

function handleRunningApps() {
  // Pause the music app if it exists before loading new content
  if (window.musicApp) {
    window.musicApp.resetAudio();
  }
  // Pause the mesh morph app if it exists before loading new content
  if (window.meshaMorph) {
    window.meshaMorph = null;
  }
}

function initMeshMorph() {
  window.meshaMorph = new MeshView();
  window.meshaMorph.animate();
}
