import React, { useRef, useState, useEffect } from 'react';

const useAudio = (src) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        if (src) {
            audioRef.current.src = src;
            audioRef.current.load();

            audioRef.current.onerror = () => {
                console.error('Failed to load audio source. Please check the file or URL.');
            };
        }
        return () => {
            audioRef.current.pause();
            audioRef.current.src = '';
        };
    }, [src]);

    const play = () => {
        if (src) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.error(err.message));
        } else {
            console.error('No audio source provided.');
        }
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
