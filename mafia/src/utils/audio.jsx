import { useRef, useState, useEffect } from "react";
import {computeGradient, computeRMS, computeVariance} from "./math";
export const audioFFTSize = 256;


export class DropDetector {
    constructor({sampleRate = 44000}) {
        this.rmsHistory = []
        this.maxHistoryLength = 200;

        this.binWidth = sampleRate / 255;
        this.baseIdxRange = this.getBinRange(20, 250);
        this.midIdxange = this.getBinRange(250, 4000);
        this.trebleIdxRange = this.getBinRange(4000, sampleRate / 2);

        this.rmsThreshold = 0.5;
    }

    getBinRange = (startFreq, endFreq) => [
        Math.floor(startFreq / this.binWidth),
        Math.ceil(endFreq / this.binWidth),
    ];

    detect(array) {
        const rms = computeRMS(array);
        this.rmsHistory.push(rms);
        if (this.rmsHistory.length > this.maxHistoryLength) {
            this.rmsHistory.shift();
        }
        console.log(computeGradient(this.rmsHistory), rms);
        return computeVariance(this.rmsHistory) < this.rmsThreshold * audioFFTSize;
    }

}



export const AudioPlayer = ({ src, makeAnalyzer = false }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [analyser, setAnalyser] = useState(null);
    const [dataArray, setDataArray] = useState(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [title, setTitle] = useState(""); // Store metadata here

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
        if (!src) return;

        // Create a new Audio element
        audioRef.current = new Audio(src);
        setTitle("unknown");
        audioRef.current.ondurationchange = () => setDuration(audioRef.current.duration || 0);
        audioRef.current.ontimeupdate = () => setCurrentTime(audioRef.current.currentTime);

        if (makeAnalyzer && !audioContextRef.current) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;

            const sourceNode = audioContext.createMediaElementSource(audioRef.current);
            const analyserNode = audioContext.createAnalyser();

            sourceNode.connect(analyserNode);
            analyserNode.connect(audioContext.destination);

            analyserNode.fftSize = 256; // Adjust as needed

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

    const changeVolume = (volume) => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            setVolume(volume);
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
        setAudioTime,
        volume,
        changeVolume,
        title,
        duration, // Expose metadata here
    };
};
