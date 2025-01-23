type FullScreenElement = HTMLElement | null;

export const toggleFullScreen = async (
  element: FullScreenElement,
  isFullScreen: boolean,
): Promise<void> => {
  try {
    if (!isFullScreen && element) {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen(); // Safari support
      }
    } else {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen(); // Safari support
      }
    }
  } catch (error) {
    console.error("Failed to toggle fullscreen:", error);
  }
};
