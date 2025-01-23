import React, { useEffect } from "react";
import { PlayerState, useYoutube } from "react-youtube-music-player";
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
import AtomImage from "../atom-image";

interface YoutubeMetadata {
  thumbnail_url?: string;
  title?: string;
  author_name?: string;
  thumbnail_height?: number;
  thumbnail_width?: number;
}

async function fetchYoutubeMetadata(vid: string) {
  const videoUrl: string = "https://www.youtube.com/watch?v=" + vid;
  const requestUrl: string = `http://youtube.com/oembed?url=${videoUrl}&format=json`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  return {
    thumbnail_url: data.thumbnail_url,
    title: data.title,
    author_name: data.author_name,
    thumbnail_height: data.thumbnail_height,
    thumbnail_width: data.thumbnail_width,
  };
}

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

  const [metadata, setMetadata] = React.useState<YoutubeMetadata>({});
  const { state, currentTime, duration } = playerDetails;

  useEffect(() => {
    if (state === PlayerState.PLAYING) {
      actions.playVideo();
    } else {
      actions.pauseVideo();
    }
  }, [state, actions]);

  useEffect(() => {
    fetchYoutubeMetadata(vid).then((data) => setMetadata(data));
  }, [vid]);

  return (
    <AtomRow
      size={LayoutSize.FullWidth}
      alignment={LayoutAlign.Center}
      gap={LayoutGap.Medium}
      className={`p-2 ${className}`}
    >
      <AtomRow>
        <AtomImage
          src={metadata.thumbnail_url || ""}
          alt={"thumbnail"}
          className={"w-48 h-48"}
        />
      </AtomRow>
      <AtomColumn size={LayoutSize.FullWidth}>
        <AtomPrimaryText className={"w-full text-center"}>
          {metadata.title}
        </AtomPrimaryText>
        <AtomRow size={LayoutSize.FullWidth} alignment={LayoutAlign.Center}>
          <AtomButton
            icon={
              state === PlayerState.PLAYING ? "fas fa-pause" : "fas fa-play"
            }
            type={ButtonType.Solid}
            size={ButtonSize.Large}
            severity={ButtonSeverity.Secondary}
            onClick={() => {
              state === PlayerState.PLAYING
                ? actions.pauseVideo()
                : actions.playVideo();
            }}
          />
          <AtomSlider
            className={"w-full h-full"}
            min={0}
            value={currentTime}
            max={duration}
            onChange={(value: number) => actions.seekTo(value, true)}
          />
        </AtomRow>
      </AtomColumn>
    </AtomRow>
  );
};

export default YoutubeMusicPlayer;
