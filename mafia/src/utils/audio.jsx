import { useRef, useState, useEffect } from "react";
export const audioFFTSize = 256;
export function computeDropLevel(array) {
    // Assumption is during drop, every frequency completely loud.
    const rms = Math.sqrt(
        array.reduce((acc, val) => acc + val ** 2, 0) / array.length,
    );
    return rms / (audioFFTSize - 1);
}


export const useAudio = ({ src, makeAnalyzer = false }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [analyser, setAnalyser] = useState(null);
    const [dataArray, setDataArray] = useState(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef(null); // Reference to the Audio element
    const audioContextRef = useRef(null); // Reference to the AudioContext
    const analyserRef = useRef(null); // Reference to the AnalyserNode
    const mediaElementSourceRef = useRef(null); // Reference to the MediaElementSourceNode

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = ""; // Disconnect the previous audio
            mediaElementSourceRef.current?.disconnect();
        }

        // Create a new Audio element
        const audioElement = new Audio(src);
        audioRef.current = audioElement;

        audioElement.ondurationchange = () => setDuration(audioElement.duration || 0);
        audioElement.ontimeupdate = () => setCurrentTime(audioElement.currentTime);

        if (makeAnalyzer && !audioContextRef.current) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;

            const sourceNode = audioContext.createMediaElementSource(audioElement);
            const analyserNode = audioContext.createAnalyser();

            sourceNode.connect(analyserNode);
            analyserNode.connect(audioContext.destination);

            analyserNode.fftSize = audioFFTSize; // Adjust as needed

            mediaElementSourceRef.current = sourceNode;
            analyserRef.current = analyserNode;

            setAnalyser(analyserNode);
            setDataArray(new Uint8Array(analyserNode.frequencyBinCount));
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
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
        }
    };

    return {
        audioRef,
        analyser,
        dataArray,
        isPlaying,
        play,
        pause,
        currentTime,
        duration,
        setAudioTime,
    };
};
