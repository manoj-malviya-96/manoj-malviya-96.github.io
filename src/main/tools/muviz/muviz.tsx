import React, { useCallback, useEffect, useRef, useState } from "react";
import ToolInfo from "../tool-info";
import { AudioPlayerProps, useAudioPlayer } from "../../../common/audio";
import Logo from "../logos/muviz.svg";
import { AtomDropdownItemProps } from "../../../atoms/atom-dropdown";

import { AtomCanvas } from "../../../atoms/canvas/atom-canvas";
import { toggleFullScreen } from "../../../common/full-screen";
import AppView from "../app-view";
import AtomMouseArea from "../../../atoms/atom-mouse-area";
import { BaseVisualizer } from "./base-visualizer";
import {
  createVisualizer,
  defaultVizOptions,
  VisualizerType,
} from "./visualizers";
import { defaultSongOptions } from "./sample-songs";
import MuvizOverlay from "./muviz-overlay";

interface MuvizAppProps {
  songOptions: AtomDropdownItemProps[];
  vizOptions: AtomDropdownItemProps[];
}

const MuvizApp: React.FC<MuvizAppProps> = ({ songOptions, vizOptions }) => {
  const timeSkip_s = 10;

  // State Management
  const [src, setSrc] = useState<AudioPlayerProps["src"]>(null);
  const [visualizerType, setVisualizerType] = useState(VisualizerType.Abstract);
  const [controller, setController] = useState<BaseVisualizer | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [showHud, setShowHud] = useState<boolean>(true);
  const appRef = useRef<HTMLDivElement | null>(null);

  // Player Setup
  const {
    isPlaying,
    play,
    pause,
    currentTime,
    setAudioTime,
    volume,
    changeVolume,
    title,
    duration,
    features,
  } = useAudioPlayer({ src, makeAnalyzer: true });

  const updateVisualizer = useCallback(() => {
    const viz = createVisualizer(visualizerType);
    setController(new viz());
  }, [visualizerType, setController]);

  const handleSampleSongChange = useCallback(
    (value: any) => {
      controller?.stop();
      setSrc(value);
    },
    [controller, setSrc],
  );

  const handleVisualizerChange = useCallback((value: any) => {
    setVisualizerType(value);
  }, []);

  const handlePlayOrPause = useCallback(() => {
    if (isPlaying) {
      controller?.stop();
      pause();
    } else {
      updateVisualizer();
      play();
    }
  }, [play, pause, controller, updateVisualizer, isPlaying]);

  const skipForward = useCallback(() => {
    setAudioTime(currentTime + timeSkip_s);
  }, [currentTime, setAudioTime]);

  const skipBackward = useCallback(() => {
    setAudioTime(currentTime - Math.max(currentTime, timeSkip_s));
  }, [currentTime, setAudioTime]);

  const handleToggleFullScreen = useCallback(() => {
    toggleFullScreen(appRef.current, isFullScreen).then(() =>
      setIsFullScreen(!isFullScreen),
    );
    if (isFullScreen) {
      setShowHud(false);
    } else {
      setShowHud(true);
    }
  }, [isFullScreen, setShowHud]);

  const handleFileChange = useCallback(
    (file: string) => {
      if (file) {
        controller?.stop();
        setSrc(file);
      }
    },
    [setSrc, controller],
  );

  const toggleVolume = useCallback(() => {
    if (volume === 0) {
      changeVolume(0.69);
    } else {
      changeVolume(0);
    }
  }, [volume, changeVolume]);

  useEffect(() => {
    if (controller) {
      controller.update(features);
    }
  }, [features, controller]);

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        setShowHud(false);
      }, 2000);
    } else {
      setShowHud(true);
    }
  }, [isPlaying, setShowHud]);

  return (
    <div className="block h-full w-full" data-theme="Dark" ref={appRef}>
      <AtomCanvas
        controller={controller}
        animationLoop={isPlaying}
        className="bg-black absolute top-0 left-0 w-full h-full z-0"
      />

      <AtomMouseArea
        className={`w-fit h-fit z-5`}
        onLeave={() => {
          if (isPlaying) {
            setShowHud(false);
          }
        }}
        onHover={() => setShowHud(true)}
      >
        <div
          className={`absolute bottom-0 left-0 w-full h-fit p-4
								${showHud ? "opacity-100" : "opacity-0"}`}
        >
          <MuvizOverlay
            title={title}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isPlaying={isPlaying}
            songOptions={songOptions}
            vizOptions={vizOptions}
            isFullScreen={isFullScreen}
            canPlay={!!src}
            onSliderChange={setAudioTime}
            onPlayPause={handlePlayOrPause}
            onVolumeChange={changeVolume}
            onToggleVolume={toggleVolume}
            onSkipForward={skipForward}
            onSkipBackward={skipBackward}
            onFileChange={handleFileChange}
            onVisualizerChange={handleVisualizerChange}
            onSampleSongChange={handleSampleSongChange}
            onToggleFullScreen={handleToggleFullScreen}
          />
        </div>
      </AtomMouseArea>
    </div>
  );
};

const AppName = "MUVIZ";
const MuvizView = () => {
  return (
    <AppView
      appName={AppName}
      appLogo={Logo}
      children={
        <MuvizApp
          songOptions={defaultSongOptions}
          vizOptions={defaultVizOptions}
        />
      }
    />
  );
};

class Muviz extends ToolInfo {
  constructor() {
    super({
      id: "muviz",
      name: AppName,
      description: "music + stunning visuals",
      cover: Logo,
      componentConstructor: () => <MuvizView />,
    });
  }
}

export default Muviz;
