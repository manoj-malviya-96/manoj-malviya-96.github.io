import React, { useCallback, useEffect, useRef, useState } from "react";
import ToolInfo from "../tool-info";
import { AudioPlayerProps, useAudioPlayer } from "../../../common/audio";
import { AtomButton, ButtonSize, ButtonType } from "../../../atoms/atom-button";
import Logo from "../logos/muviz.svg";
import AtomDropdown, {
  AtomDropdownItemProps,
} from "../../../atoms/atom-dropdown";

import Princess from "./sample-music/princess.mp3";
import Flood from "./sample-music/Sebastian_Flood.mp3";
import StayInit from "./sample-music/FredAgain_StayInit.mp3";

import { AtomCanvas } from "../../../atoms/atom-canvas";
import AtomSlider from "../../../atoms/atom-slider";
import { formatTime } from "../../../common/date";
import {
  AbstractVisualizer,
  BaseVisualizer,
  VisualizerType,
} from "./visualizers";
import AtomFileUpload from "../../../atoms/atom-file-upload";
import { toggleFullScreen } from "../../../common/full-screen";
import AppView from "../app-view";
import AtomDialog from "../../../atoms/atom-dialog";
import {
  AtomColumn,
  AtomRow,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../../../atoms/atom-layout";
import { AtomPrimaryText, AtomSubtitleText } from "../../../atoms/atom-text";
import AtomMouseArea from "../../../atoms/atom-mouse-area";

const AppName = "MUVIZ";

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
    switch (visualizerType) {
      case VisualizerType.Spiral:
      case VisualizerType.Abstract:
        const viz = new AbstractVisualizer();
        setController(viz);
        break;
      default:
        throw new Error("Invalid visualizer type");
    }
  }, [visualizerType, setController]);

  const handleSampleSongChange = useCallback(
    (value: any) => {
      controller?.stop();
      setSrc(value);
    },
    [controller, setSrc],
  );

  useEffect(() => {}, [isPlaying]);

  useEffect(() => {}, [controller]);

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
    changeVolume(volume === 0 ? 0.69 : 0);
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
          <AtomColumn gap={LayoutGap.Small}>
            {/* Metadata */}
            <AtomRow
              alignment={LayoutAlign.CenterBetween}
              size={LayoutSize.FullWidth}
            >
              <AtomSubtitleText>{title ? title : "No Song"}</AtomSubtitleText>
              <AtomPrimaryText>
                {formatTime(currentTime)} / {formatTime(duration)}
              </AtomPrimaryText>
            </AtomRow>

            {/* Time Slider*/}
            <AtomSlider
              value={currentTime}
              min={0}
              max={duration || 0}
              step={0.1}
              onChange={setAudioTime}
              className="w-full h-fit"
            />
            {/* Volume and Right Controls */}
            <AtomRow
              alignment={LayoutAlign.CenterBetween}
              size={LayoutSize.FullWidth}
              smallDeviceAdjustment={true}
            >
              {/* Left Controls */}
              <AtomRow gap={LayoutGap.Small} size={LayoutSize.Fit}>
                <AtomButton
                  icon="fa-solid fa-arrow-rotate-left"
                  type={ButtonType.Ghost}
                  size={ButtonSize.Large}
                  onClick={skipBackward}
                  disabled={!src}
                />
                <AtomButton
                  icon={isPlaying ? "fa fa-pause" : "fa fa-play"}
                  disabled={!src}
                  size={ButtonSize.Large}
                  type={ButtonType.Ghost}
                  onClick={handlePlayOrPause}
                />
                <AtomButton
                  icon="fa-solid fa-arrow-rotate-right"
                  type={ButtonType.Ghost}
                  size={ButtonSize.Large}
                  onClick={skipForward}
                  disabled={!src}
                />

                <div className="w-48 flex flex-row gap-1 items-center">
                  <AtomButton
                    icon={
                      volume === 0
                        ? "fa-solid fa-volume-xmark"
                        : volume > 0.69
                          ? "fa-solid fa-volume-high"
                          : "fa-solid fa-volume-low"
                    }
                    type={ButtonType.Ghost}
                    onClick={toggleVolume}
                  />
                  <AtomSlider
                    value={volume}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={changeVolume}
                    className={"w-1/3 h-fit"}
                  />
                </div>
              </AtomRow>

              <AtomRow size={LayoutSize.Fit} alignment={LayoutAlign.Center}>
                <AtomDropdown
                  options={songOptions}
                  dropdownIcon={"fas fa-music"}
                  onClick={handleSampleSongChange}
                  className="h-full w-36 m-auto"
                  placeholder="Sample Song"
                />
                <AtomDialog icon="fa-solid fa-upload" title="Upload Song">
                  <AtomColumn>
                    <AtomPrimaryText>
                      Only audio files (.wav/.mp3/..) are supported
                    </AtomPrimaryText>
                    <AtomFileUpload
                      acceptTypes="audio/*"
                      onFileChange={handleFileChange}
                    />
                  </AtomColumn>
                </AtomDialog>

                <AtomDropdown
                  options={vizOptions}
                  onClick={handleVisualizerChange}
                  className="h-full w-28 m-auto"
                  placeholder="Select Visualizer"
                  initialIndex={0}
                />

                <AtomButton
                  icon={isFullScreen ? "fa fa-compress" : "fa fa-expand"}
                  onClick={handleToggleFullScreen}
                  type={ButtonType.Ghost}
                />
              </AtomRow>
            </AtomRow>
          </AtomColumn>
        </div>
      </AtomMouseArea>
    </div>
  );
};

const defaultSongOptions = [
  {
    label: "Princess",
    value: Princess,
  } as AtomDropdownItemProps,
  {
    label: "Flood",
    value: Flood,
  } as AtomDropdownItemProps,
  {
    label: "STAYinit",
    value: StayInit,
  } as AtomDropdownItemProps,
];

const defaultVizOptions = [
  {
    label: "Abstract",
    value: VisualizerType.Abstract,
  } as AtomDropdownItemProps,
];

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
