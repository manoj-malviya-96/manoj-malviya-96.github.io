import React, {useEffect, useRef, useState} from "react";
import {computeRMS, computeVariance} from "./math";
import parse from "id3-parser";
import {IBytes} from "id3-parser/lib/interface";

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


export interface ID3Metadata {
    title?: string;
    artist?: string;
    album?: string;
    year?: string;
    genre?: string;
    trackNumber?: string;
    [key: string]: any; // For additional unknown tags
}

const fetchMetadataFromUrl = async (url: string): Promise<ID3Metadata | null> => {
    try {
        // Fetch the audio file as an ArrayBuffer
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch audio: ${response.statusText}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        
        // Parse metadata using id3-parser
        const metadata = parse(arrayBuffer as IBytes);
        if (!metadata) {
            console.warn("No ID3 tags found in the audio file.");
            return null;
        }
        return metadata as ID3Metadata;
    } catch (error) {
        console.error("Error fetching or parsing metadata:", error);
        return null;
    }
};


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
    const [title, setTitle] = useState<string>("");
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const mediaElementSourceRef = useRef<MediaElementAudioSourceNode | null>(null); // Reference to the
    
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
        
        fetchMetadataFromUrl(src).then((metadata: ID3Metadata | null) => {
            console.log("Metadata:", metadata);
            if (metadata) {
                setTitle(metadata.title || "Unknown");
            } else {
                setTitle("Unknown");
            }
        });
        
        // Create a new Audio element
        audioRef.current = new Audio(src);
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
                audioContextRef.current.close().then(r => console.log("Audio context closed"));
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
