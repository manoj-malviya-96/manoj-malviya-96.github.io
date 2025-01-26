import AtomDropdown, {
  AtomDropdownItemProps,
} from "../../../atoms/atom-dropdown";
import React from "react";
import {
  AtomColumn,
  AtomRow,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../../../atoms/atom-layout";
import { AtomPrimaryText, AtomSubtitleText } from "../../../atoms/atom-text";
import { formatTime } from "../../../common/date";
import AtomSlider from "../../../atoms/atom-slider";
import AtomDialog from "../../../atoms/atom-dialog";
import AtomFileUpload from "../../../atoms/atom-file-upload";
import AtomButton, { ButtonSize, ButtonType } from "../../../atoms/atom-button";
import { VisualizerType } from "./visualizers";

interface MuvizOverlayProps {
  title: string;
  currentTime: number;
  duration: number;
  volume: number;
  isPlaying: boolean;
  songOptions: AtomDropdownItemProps[];
  vizOptions: AtomDropdownItemProps[];
  isFullScreen: boolean;
  canPlay: boolean;
  onPlayPause: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onSliderChange: (value: number) => void;
  onFileChange: (file: string) => void;
  onVisualizerChange: (value: VisualizerType) => void;
  onSampleSongChange: (value: string) => void;
  onVolumeChange: (value: number) => void;
  onToggleVolume: () => void;
  onToggleFullScreen: () => void;
}

const MuvizOverlay: React.FC<MuvizOverlayProps> = React.memo(
  ({
    title,
    currentTime,
    duration,
    volume,
    isPlaying,
    songOptions,
    vizOptions,
    canPlay,
    isFullScreen,
    onPlayPause,
    onVolumeChange,
    onSkipForward,
    onSkipBackward,
    onFileChange,
    onVisualizerChange,
    onSampleSongChange,
    onToggleFullScreen,
    onToggleVolume,
    onSliderChange,
  }) => {
    return (
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
          onChange={onSliderChange}
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
              onClick={onSkipBackward}
              disabled={!canPlay}
            />
            <AtomButton
              icon={isPlaying ? "fa fa-pause" : "fa fa-play"}
              disabled={!canPlay}
              size={ButtonSize.ExtraLarge}
              type={ButtonType.Ghost}
              onClick={onPlayPause}
            />
            <AtomButton
              icon="fa-solid fa-arrow-rotate-right"
              type={ButtonType.Ghost}
              size={ButtonSize.Large}
              onClick={onSkipForward}
              disabled={!canPlay}
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
                onClick={onToggleVolume}
              />
              <AtomSlider
                value={volume}
                min={0}
                max={1}
                step={0.01}
                onChange={onVolumeChange}
                className={"w-1/3 h-fit"}
              />
            </div>
          </AtomRow>

          <AtomRow size={LayoutSize.Fit} alignment={LayoutAlign.Center}>
            <AtomDropdown
              options={songOptions}
              dropdownIcon={"fas fa-music"}
              onClick={onSampleSongChange}
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
                  onFileChange={onFileChange}
                />
              </AtomColumn>
            </AtomDialog>

            <AtomDropdown
              options={vizOptions}
              onClick={onVisualizerChange}
              className="h-full w-28 m-auto"
              placeholder="Select Visualizer"
              initialIndex={0}
            />

            <AtomButton
              icon={isFullScreen ? "fa fa-compress" : "fa fa-expand"}
              onClick={onToggleFullScreen}
              type={ButtonType.Ghost}
            />
          </AtomRow>
        </AtomRow>
      </AtomColumn>
    );
  },
);

export default MuvizOverlay;
