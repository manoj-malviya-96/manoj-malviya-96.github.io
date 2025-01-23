import React, { useEffect } from "react";
import { useYoutube } from "react-youtube-music-player";
import {
  AtomColumn,
  AtomRow,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../atom-layout";
import { AtomPrimaryText } from "../atom-text";
import AtomButton, {
  ButtonSeverity,
  ButtonSize,
  ButtonType,
} from "../atom-button";
import AtomSlider from "../atom-slider";

interface YoutubePlayerProps {
  vid: string;
  className?: string;
}

const YoutubeMusicPlayer: React.FC<YoutubePlayerProps> = ({
  vid,
  className,
}) => {
  const { playerDetails, actions } = useYoutube({
    id: vid,
    type: "video",
  });

  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  useEffect(() => {
    if (isPlaying) {
      actions.playVideo();
    } else {
      actions.pauseVideo();
    }
  }, [isPlaying, actions]);

  return (
    <AtomColumn
      size={LayoutSize.FullWidth}
      alignment={LayoutAlign.Start}
      gap={LayoutGap.None}
      className={`p-2 ${className}`}
    >
      <AtomPrimaryText className={"w-full text-center"}>
        {playerDetails.title}
      </AtomPrimaryText>
      <AtomRow size={LayoutSize.FullWidth}>
        <AtomButton
          icon={isPlaying ? "fas fa-pause" : "fas fa-play"}
          type={ButtonType.Solid}
          size={ButtonSize.Large}
          severity={ButtonSeverity.Secondary}
          onClick={() => setIsPlaying(!isPlaying)}
        />
        <AtomSlider
          className={"w-full h-full"}
          min={0}
          value={playerDetails.currentTime}
          max={playerDetails.duration}
          onChange={(value: number) => actions.seekTo(value, true)}
        />
      </AtomRow>
    </AtomColumn>
  );
};

export default YoutubeMusicPlayer;
