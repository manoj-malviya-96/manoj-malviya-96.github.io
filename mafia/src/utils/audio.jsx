import { useRef, useState, useEffect } from "react";

const useAudio = ({ src = null, makeAnalyzer = false } = {}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [analyser, setAnalyser] = useState(null);
    const [dataArray, setDataArray] = useState(null);

    const audioRef = useRef(new Audio());
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const mediaElementSourceRef = useRef(null);

    useEffect(() => {
        if (!src) return;

        // Initialize the audio element
        audioRef.current.src = src;
        audioRef.current.load();

        const updateTimes = () => {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        };

        audioRef.current.addEventListener("timeupdate", updateTimes);

        if (makeAnalyzer && !audioContextRef.current) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;

            // Create MediaElementSourceNode only once
            if (!mediaElementSourceRef.current) {
                mediaElementSourceRef.current = audioContext.createMediaElementSource(audioRef.current);
            }

            const analyserNode = audioContext.createAnalyser();
            mediaElementSourceRef.current.connect(analyserNode);
            analyserNode.connect(audioContext.destination);

            analyserNode.fftSize = 256;
            analyserRef.current = analyserNode;
            setAnalyser(analyserNode);
            setDataArray(new Uint8Array(analyserNode.frequencyBinCount));
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener("timeupdate", updateTimes);
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
                analyserRef.current = null;
                mediaElementSourceRef.current = null;
            }
        };
    }, [src, makeAnalyzer]);

    const play = () => {
        if (audioRef.current) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.error(err.message));
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const setAudioTime = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    return {
        analyser,
        dataArray,
        isPlaying,
        currentTime,
        duration,
        play,
        pause,
        setAudioTime,
    };
};

export default useAudio;
