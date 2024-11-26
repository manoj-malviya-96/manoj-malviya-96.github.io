import React, {useRef, useState} from 'react'

const useAudio = (src) => {
    const audioRef = useRef(new Audio(src));
    const [isPlaying, setIsPlaying] = useState(false);

    const play = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const togglePlayPause = () => {
        isPlaying ? pause() : play();
    };

    return {
        audioRef,
        isPlaying,
        play,
        pause,
        togglePlayPause,
    };
};

export default useAudio;