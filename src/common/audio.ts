import {useCallback, useEffect, useRef, useState} from "react";
import Meyda, {MeydaFeaturesObject} from "meyda";
import jsmediatags from "jsmediatags";

export interface AudioPlayerProps {
	src: string | null;
	makeAnalyzer?: boolean;
}

export const AnalyzerBufferSize = 512;

// Goes with Audio Features
const FeaturesToExtract = ["perceptualSpread", "perceptualSharpness",
		"spectralFlatness", "spectralCentroid", "energy"];
export interface AudioFeatures {
	perceptualSpread: number,
	perceptualSharpness: number,
	spectralFlatness: number,
	spectralCentroid: number,
	energy: number
}

export interface AudioPlayer {
	isPlaying: boolean;
	play: () => void;
	pause: () => void;
	currentTime: number;
	setAudioTime: (time: number) => void;
	volume: number;
	changeVolume: (volume: number) => void;
	title: string;
	duration: number;
	features: any;
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
					onError: (error) => reject(`Error reading metadata: ${error.type}`),
				});
			})
			.catch((error) => reject(`Error fetching file: ${error.message}`));
	});
};

export const useAudioPlayer = ({src, makeAnalyzer = false}: AudioPlayerProps): AudioPlayer => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [features, setFeatures] = useState<AudioFeatures | undefined>(undefined);
	const [title, setTitle] = useState<string>("");
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const mediaElementSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
	const meydaAnalyzerRef = useRef<Meyda.MeydaAnalyzer | null>(null);
	
	const play = useCallback(() => {
		audioRef.current?.play().then(() => setIsPlaying(true));
		meydaAnalyzerRef.current?.start();
	}, [audioRef, meydaAnalyzerRef]);

	const pause = useCallback(() => {
		audioRef.current?.pause();
		meydaAnalyzerRef.current?.stop();
		setIsPlaying(false);
	}, [audioRef, meydaAnalyzerRef]);
	
	useEffect(() => {
		if (audioRef.current) {
			setIsPlaying(false);
			audioRef.current.pause();
			audioRef.current.src = "";
			mediaElementSourceRef.current?.disconnect();
			meydaAnalyzerRef.current = null;
		}
		if (!src) {
			return;
		}
		
		readAudioMetadata(src).then(({title}) => setTitle(title || "Unknown Title"));
		audioRef.current = new Audio(src);
		audioRef.current.crossOrigin = "anonymous";
		
		if (makeAnalyzer) {
			const audioContext = new (
				window.AudioContext || window.webkitAudioContext
			)();
			audioContextRef.current = audioContext;
			
			const sourceNode = audioContext.createMediaElementSource(audioRef.current);
			mediaElementSourceRef.current = sourceNode;
			
			meydaAnalyzerRef.current = Meyda.createMeydaAnalyzer({
				audioContext,
				source: sourceNode,
				bufferSize: AnalyzerBufferSize,
				featureExtractors: FeaturesToExtract,
				callback: (features: Partial<MeydaFeaturesObject>) => {
					setFeatures(features as AudioFeatures);
				},
			});
   
			meydaAnalyzerRef.current.start();
			sourceNode.connect(audioContext.destination);
		}
		
		return () => {
			audioRef.current?.pause();
            meydaAnalyzerRef.current?.stop();
			audioContextRef.current?.close().then(r => console.log("Audio Closed : ", r));
		};
	}, [src, makeAnalyzer, setIsPlaying]);
	
	return {
		isPlaying,
		play,
		pause,
		currentTime: audioRef.current?.currentTime || 0,
		setAudioTime: (time) => {
			if (audioRef.current) {
				audioRef.current.currentTime = time;
			}
		},
		volume: audioRef.current?.volume || 1,
		changeVolume: (volume) => {
			if (audioRef.current) {
				audioRef.current.volume = volume;
			}
		},
		title,
		duration: audioRef.current?.duration || 0,
		features,
	};
};