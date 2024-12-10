import React, {useRef, useState, useEffect} from "react";
import {computeGradient, computeRMS, computeVariance} from "./math";

export const audioFFTSize = 256;

export class DropDetector {
    private readonly rmsHistory: any[];
    private readonly maxHistoryLength: number;
    private readonly binWidth: number;
    private readonly rmsThreshold: number;
    
    constructor({sampleRate = 44000}) {
        this.rmsHistory = []
        this.maxHistoryLength = 200;
        this.binWidth = sampleRate / 255;
        this.rmsThreshold = 0.5;
    }
    
    detect(array: Uint8Array) {
        const arrayAsNumber = Array.from(array);
        const rms = computeRMS(arrayAsNumber);
        this.rmsHistory.push(rms);
        if (this.rmsHistory.length > this.maxHistoryLength) {
            this.rmsHistory.shift();
        }
        return computeVariance(this.rmsHistory) < this.rmsThreshold * audioFFTSize;
    }
    
}


export interface AudioPlayerProps {
    src: string | null;
    makeAnalyzer?: boolean; // Optional, defaults to false
}

export interface AudioPlayer {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    analyser: AnalyserNode | null;
    dataArray: Uint8Array | null;
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    currentTime: number;
    setAudioTime: (time: number) => void;
    volume: number;
    changeVolume: (volume: number) => void;
    title: string;
    duration: number;
}

export const useAudioPlayer = ({
                                   src,
                                   makeAnalyzer = false
                               }: AudioPlayerProps): AudioPlayer => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
    const [dataArray, setDataArray] = useState<Uint8Array | null>(null);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);
    const [title, setTitle] = useState<string>(""); // Store
                                                    // metadata here
    
    const audioRef = useRef<HTMLAudioElement | null>(null); // Reference
                                                            // to
                                                            // the
                                                            // Audio
                                                            // element
    const audioContextRef = useRef<AudioContext | null>(null); // Reference
                                                               // to
                                                               // the
                                                               // AudioContext
    const analyserRef = useRef<AnalyserNode | null>(null); // Reference
                                                           // to the
                                                           // AnalyserNode
    const mediaElementSourceRef = useRef<MediaElementAudioSourceNode | null>(null); // Reference to the MediaElementSourceNode
    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = ""; // Disconnect the previous
                                       // audio
            mediaElementSourceRef.current?.disconnect();
        }
        if (!src) {
            return;
        }
        
        // Create a new Audio element
        audioRef.current = new Audio(src);
        setTitle("unknown");
        audioRef.current.ondurationchange = () => setDuration(audioRef.current?.duration || 0);
        audioRef.current.ontimeupdate = () => setCurrentTime(audioRef.current?.currentTime || 0);
        
        if (makeAnalyzer && !audioContextRef.current) {
            const audioContext = new (
                window.AudioContext || window.webkitAudioContext
            )();
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
    
    const setAudioTime = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };
    
    const changeVolume = (volume: number) => {
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
        duration,
    };
};
