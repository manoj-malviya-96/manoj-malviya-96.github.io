import React, {useCallback, useRef, useState} from 'react';
import ToolInfo from "../tool-info";
import {
    AudioPlayerProps,
    useAudioPlayer
} from "../../../common/audio";
import {AtomButton} from "../../../atoms/atom-button";
import Logo from '../logos/muviz.svg';
import AtomDropdown, {
    AtomDropdownItemProps
} from "../../../atoms/atom-dropdown";

import CallingON from './sample-music/calling.mp3';
import CanYouFeelIt from './sample-music/can_u_feel_it.mp3';
import Uneath from './sample-music/uneath.mp3';

import {AtomCanvas, AtomCanvasController} from "../../../atoms/atom-canvas";
import AtomSlider from "../../../atoms/atom-slider";
import {formatTime} from "../../../common/date";
import {
    BarVisualizer,
    SpiralVisualizer,
    toString,
    VisualizerType
} from "./visualizers";
import AtomFileUpload from "../../../atoms/atom-file-upload";
import ModalButton from "../../../atoms/modal-button";
import {toggleFullScreen} from "../../../common/full-screen";
import AppView from "../../../atoms/app-view";

const AppName = 'MUVIZ';

interface MuvizAppProps {
    songOptions: AtomDropdownItemProps[];
    vizOptions: AtomDropdownItemProps[];
}

const MuvizApp: React.FC<MuvizAppProps> = ({
                                               songOptions,
                                               vizOptions
                                           }) => {
    const timeSkip_s = 10;
    
    // State Management
    const [src, setSrc] = useState<AudioPlayerProps["src"]>(null);
    const [visualizerType, setVisualizerType] = useState(VisualizerType.Bar);
    const [controller, setController] = useState<AtomCanvasController | null>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const appRef = useRef<HTMLDivElement | null>(null);
    
    // Player Setup
    const {
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
    } = useAudioPlayer({src, makeAnalyzer: true});
    
    const updateVisualizer = useCallback(async () => {
        if (!analyser || !dataArray) {
            return;
        }
        console.log("Creating visualizer...", toString(visualizerType));
        switch (visualizerType) {
            case VisualizerType.Spiral:
                const spiralViz = new SpiralVisualizer({
                    analyser: analyser,
                    dataArray: dataArray,
                });
                setController(spiralViz);
                break;
            case VisualizerType.Bar:
                const barViz = new BarVisualizer({
                    analyser: analyser,
                    dataArray: dataArray,
                });
                setController(barViz);
                break;
            default:
                throw new Error("Invalid visualizer type");
        }
    }, [analyser, dataArray, visualizerType]);
    
    const stopController = useCallback(() => {
        if (controller) {
            controller.stop();
        }
    }, [controller]);
    
    const handleSampleSongChange = useCallback(
        (value: any) => {
            setSrc(value);
            stopController();
            pause();
        },
        [stopController, pause]
    );
    
    const handleVisualizerChange = useCallback(
        (value: any) => {
            stopController();
            setVisualizerType(value);
            pause();
        },
        [stopController, pause]
    );
    
    const handlePlayOrPause = useCallback(() => {
        if (isPlaying) {
            stopController();
            pause();
        } else {
            updateVisualizer().then(() => play());
        }
    }, [play, pause, stopController, updateVisualizer, isPlaying]);
    
    const skipForward = useCallback(() => {
        setAudioTime(currentTime + timeSkip_s);
    }, [currentTime, setAudioTime]);
    
    const skipBackward = useCallback(() => {
        setAudioTime(currentTime - timeSkip_s);
    }, [currentTime, setAudioTime]);
    
    const handleToggleFullScreen = useCallback(() => {
        toggleFullScreen(appRef.current, isFullScreen).then(() => setIsFullScreen(!isFullScreen));
    }, [isFullScreen]);
    
    const handleFileChange = useCallback((file: string) => {
        if (file) {
            setSrc(file);
        }
    }, []);
    
    const toggleVolume = useCallback(() => {
        changeVolume(volume === 0 ? 0.69 : 0);
    }, [volume, changeVolume]);
    const showHUD = !isPlaying;
    
    
    // Render
    return (
        <div className="h-full w-full justify-center align-center"
             ref={appRef}>
            <AtomCanvas controller={controller}
                        className="bg-black absolute top-0 left-0 w-full h-full z-0"/>
            
            {/*HUD*/}
            <div className={`inline-block w-full h-full z-5 p-4 bg-transparent
                ${showHUD ? "lg:opacity-100" : "lg:opacity-0"}
                 lg:hover:opacity-100`}>
                {/*Central Controls*/}
                <div
                    className="flex flex-wrap sm:flex-nowrap w-full h-fit justify-center
                        items-center gap-4 absolute left-1/2 top-1/2 transform -translate-x-1/2">
                    <AtomButton
                        icon="fa-solid fa-arrow-rotate-left"
                        neutralGhost={true}
                        size="large"
                        onClick={skipBackward}
                        disabled={!src || currentTime < 10}
                    />
                    <AtomButton
                        icon={isPlaying ? "fa fa-pause" : "fa fa-play"}
                        disabled={!src}
                        size="large"
                        neutralGhost={true}
                        onClick={handlePlayOrPause}
                    />
                    <AtomButton
                        icon="fa-solid fa-arrow-rotate-right"
                        size="large"
                        onClick={skipForward}
                        disabled={!src}
                        neutralGhost={true}
                    />
                </div>
                
                {/*Bottom HUD*/}
                <div
                    className="flex flex-col gap-4 w-full rounded-lg h-fit absolute left-0 bottom-0 p-4">
                    
                    {/* Metadata */}
                    <div
                        className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full h-full gap-4">
                        <span
                            className="text-base text-white sm:text-lg font-bold">
                            {title ? title : "No Song"}
                        </span>
                        <span
                            className="text-xs text-white sm:text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>
                    
                    {/* Time Slider*/}
                    <AtomSlider
                        value={currentTime}
                        min={0}
                        max={duration || 0}
                        step={0.1}
                        onChange={setAudioTime}
                        className="w-full h-fit"
                        neutralMode={true}
                    />
                    
                    
                    <div
                        className="flex flex-wrap sm:flex-nowrap justify-between
                                    items-center w-full h-fit"
                    >
                        {/* Volume Row */}
                        <div
                            className="w-48 flex flex-row gap-1 items-center">
                            <AtomButton
                                icon={
                                    volume === 0
                                    ? "fa-solid fa-volume-xmark"
                                    : volume > 0.69
                                      ? "fa-solid fa-volume-high"
                                      : "fa-solid fa-volume-low"
                                }
                                neutralGhost={true}
                                onClick={toggleVolume}
                            />
                            <AtomSlider
                                value={volume}
                                min={0}
                                max={1}
                                step={0.01}
                                onChange={changeVolume}
                                neutralMode={true}
                                size="small"
                                className={"w-1/3 h-fit"}
                            />
                        </div>
                        
                        {/* Right Controls*/}
                        <div
                            className="w-full lg:w-fit h-full flex flex-row gap-4 justify-around">
                            <AtomDropdown
                                options={songOptions}
                                dropdownIcon={"fas fa-music"}
                                onClick={handleSampleSongChange}
                                className="h-full w-fit m-auto"
                                placeholder="Select Song"
                                neutralMode={true}
                            />
                            <AtomDropdown
                                options={vizOptions}
                                onClick={handleVisualizerChange}
                                className="h-full w-fit m-auto"
                                placeholder="Select Visualizer"
                                initialIndex={0}
                                neutralMode={true}
                            />
                            <ModalButton
                                icon="fa-solid fa-plus"
                                title="Choose Music"
                                className="h-full w-fit m-auto"
                                onClick={() => {
                                }}
                                dialogContent={
                                    <div
                                        className="flex flex-col gap-2">
                                        <span className="text-base">Upload Music</span>
                                        <span className="text-xs">Only audio files are supported</span>
                                        <AtomFileUpload
                                            acceptTypes="audio/*"
                                            onFileChange={handleFileChange}/>
                                    </div>
                                }
                                neutralGhost={true}
                                addOkButton={true}
                            />
                            <AtomButton
                                icon={isFullScreen ? "fa fa-compress" : "fa fa-expand"}
                                className="h-full w-fit m-auto"
                                onClick={handleToggleFullScreen}
                                neutralGhost={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const defaultSongOptions =
    [
        {
            label: 'calling on',
            value: CallingON,
        } as AtomDropdownItemProps,
        {
            label: 'can you feel it',
            value: CanYouFeelIt,
        } as AtomDropdownItemProps,
        {
            label: 'underneath it all',
            value: Uneath,
        } as AtomDropdownItemProps
    ];


const defaultVizOptions = [
    {
        label: toString(VisualizerType.Bar),
        value: VisualizerType.Bar,
    } as AtomDropdownItemProps,
    {
        label: toString(VisualizerType.Spiral),
        value: VisualizerType.Spiral,
    } as AtomDropdownItemProps
]

const MuvizView = () => {
    return (
        <AppView
            appName={AppName}
            appLogo={Logo}
            children={
                <MuvizApp songOptions={defaultSongOptions}
                          vizOptions={defaultVizOptions}/>
            }
        />
    )
}

class Muviz extends ToolInfo {
    constructor() {
        super({
            id: 'muviz',
            name: AppName,
            description: 'music + stunning visuals',
            cover: Logo,
            componentConstructor: () => (
                <MuvizView/>
            )
        });
    }
}


// We keep everything private and only expose the instance.
const muvizInstance = new Muviz();
export default muvizInstance;