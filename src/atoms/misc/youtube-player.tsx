import React from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";

interface YoutubePlayerProps {
  vid: string;
  className?: string;
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ vid, className }) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  return (
    <YouTube
      videoId={vid}
      iframeClassName={className}
      onReady={onPlayerReady}
    />
  );
};

export default YoutubePlayer;
