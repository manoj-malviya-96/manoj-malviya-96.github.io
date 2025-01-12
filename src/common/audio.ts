import React, {useEffect, useRef, useState} from "react";
import Meyda from "meyda";
import jsmediatags from "jsmediatags";


export const audioFFTSize = 256;

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

const readAudioMetadata = async (src: string): Promise<{ title?: string; artist?: string }> => {
    return new Promise((resolve, reject) => {
        fetch(src)
            .then((response) => response.blob())
            .then((blob) => {
                jsmediatags.read(blob, {
                    onSuccess: (tag) => {
                        resolve({
                            title: tag.tags.title || 'Unknown Title',
                            artist: tag.tags.artist || 'Unknown Artist',
                        });
                    },
                    onError: (error) => {
                        reject(`Error reading metadata: ${error.type}`);
                    },
                });
            })
            .catch((error) => {
                reject(`Error fetching file: ${error.message}`);
            });
    });
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
    const [title, setTitle] = useState<string>("");
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const mediaElementSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const meydaAnalyzerRef = useRef<Meyda.MeydaAnalyzer | null>(null);
    const [features, setFeatures] = useState<any>(null);
    
    
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
        readAudioMetadata(src).then(({title}) => setTitle(title || "Sad"));
        
        // Create a new Audio element
        audioRef.current = new Audio(src);
        audioRef.current.onloadedmetadata = () => setTitle(audioRef.current?.title || "Sad");
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
