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

function initMusicApp() {
  window.musicApp = new MusicVizView();
}

function initMeshMorph() {
  window.meshaMorph = new MeshView();
  window.meshaMorph.animate();
}

function initLatticeTopt() {
  window.latticeTopt = new LatticeViewer();
}
