import React, {useCallback, useEffect, useRef, useState} from 'react';
import ToolInfo from "../tool-info";
import {AudioPlayerProps, useAudioPlayer} from "../../../common/audio";
import {AtomButton, ButtonSize, ButtonType} from "../../../atoms/atom-button";
import Logo from '../logos/muviz.svg';
import AtomDropdown, {AtomDropdownItemProps} from "../../../atoms/atom-dropdown";

import Lioness from './sample-music/MM_Lioness.mp3';
import Flood from './sample-music/Sebastian_Flood.mp3';
import StayInit from './sample-music/FredAgain_StayInit.mp3';

import {AtomCanvas} from "../../../atoms/atom-canvas";
import AtomSlider from "../../../atoms/atom-slider";
import {formatTime} from "../../../common/date";
import {AbstractVisualizer, BaseVisualizer, VisualizerType} from "./visualizers";
import AtomFileUpload from "../../../atoms/atom-file-upload";
import {toggleFullScreen} from "../../../common/full-screen";
import AppView from "../app-view";
import AtomDialog from "../../../atoms/atom-dialog";
import {useKeyboardManager} from "../../../providers/keyboard";
import {AtomColumn} from "../../../atoms/atom-layout";
import {AtomPrimaryText} from "../../../atoms/atom-text";

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
    const [visualizerType, setVisualizerType] = useState(VisualizerType.Abstract);
    const [controller, setController] = useState<BaseVisualizer | null>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const appRef = useRef<HTMLDivElement | null>(null);
    const {addShortcut, removeShortcut} = useKeyboardManager();
    const [hudVisible, setHudVisible] = useState(true);
    
    // Player Setup
    const {
        isPlaying,
        play,
        pause,
        currentTime,
        setAudioTime,
        volume,
        changeVolume,
        title,
        duration,
        features
    } = useAudioPlayer({src, makeAnalyzer: true});
    
    const updateVisualizer = useCallback(async () => {
        switch (visualizerType) {
            case VisualizerType.Spiral:
            case VisualizerType.Abstract:
                const viz = new AbstractVisualizer();
                setController(viz);
                break;
            default:
                throw new Error("Invalid visualizer type");
        }
    }, [visualizerType]);
    
    useEffect(()=>{
        controller?.update(features);
    }, [features, controller]);
    
    const stopController = useCallback(() => {
        if (controller) {
            controller.stop();
            setController(null);
        }
    }, [controller]);
    
    
    useEffect(() => {
        pause();
        stopController();
        setController(null);
        setAudioTime(0);
        if (src){
            updateVisualizer().then(play);
        }
    }, [src, pause, play, setAudioTime, setController, stopController, updateVisualizer]); // Only run this effect when `src` changes
    
    const handleSampleSongChange = useCallback(
        (value: any) => {
            setSrc(value);
        },
        []
    );
    
    const handleVisualizerChange = useCallback(
        (value: any) => {
            pause();
            stopController();
            setVisualizerType(value);
            setAudioTime(0);
        },
        [pause, stopController, setAudioTime]
    );
    
    useEffect(() => {
        controller?.update(features);
    }, [features, controller]); // Only update when features or controller changes
    
    useEffect(() => {
        if (isPlaying) {
            setHudVisible(false);
        } else {
            const timeout = setTimeout(() => setHudVisible(true), 1000); // Delay HUD show
            return () => clearTimeout(timeout);
        }
    }, [isPlaying]);
    
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
            stopController();
            setSrc(file);
        }
    }, [stopController, setSrc]);
    
    const toggleVolume = useCallback(() => {
        changeVolume(volume === 0 ? 0.69 : 0);
    }, [volume, changeVolume]);
    
    
    useEffect(() => {
        addShortcut(" ", handlePlayOrPause);
        return () => {
            removeShortcut(" ");
        };
    }, [handlePlayOrPause, addShortcut, removeShortcut]);
    
    // Render
    return (
        <div className="h-full w-full justify-center align-center"
             data-theme="Dark"
             ref={appRef}>
            <AtomCanvas controller={controller}
                        className="bg-black absolute top-0 left-0 w-full h-full z-0"/>
            
            {/*HUD*/}
            <div className={`inline-block w-full h-full z-5 p-4 bg-transparent
                ${hudVisible ? "lg:opacity-100" : "lg:opacity-0"} lg:hover:opacity-100`}>
                {/*Central Controls*/}
                <div
                    className="flex flex-wrap sm:flex-nowrap w-full h-fit justify-center
                        items-center gap-4 absolute left-1/2 top-1/2 transform -translate-x-1/2">
                    <AtomButton
                        icon="fa-solid fa-arrow-rotate-left"
                        type={ButtonType.Ghost}
                        size={ButtonSize.ExtraLarge}
                        onClick={skipBackward}
                        disabled={!src || currentTime < 10}
                    />
                    <AtomButton
                        icon={isPlaying ? "fa fa-pause" : "fa fa-play"}
                        disabled={!src}
                        size={ButtonSize.ExtraLarge}
                        type={ButtonType.Ghost}
                        onClick={handlePlayOrPause}
                    />
                    <AtomButton
                        icon="fa-solid fa-arrow-rotate-right"
                        type={ButtonType.Ghost}
                        size={ButtonSize.ExtraLarge}
                        onClick={skipForward}
                        disabled={!src}
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
                    {/* Volume and Right Controls */}
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
                                type={ButtonType.Ghost}
                                onClick={toggleVolume}
                            />
                            <AtomSlider
                                value={volume}
                                min={0}
                                max={1}
                                step={0.01}
                                onChange={changeVolume}
                                neutralMode={true}
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
                                className="h-full w-32 m-auto"
                                placeholder="Sample Song"
                            />
                            <AtomDialog
                                icon="fa-solid fa-upload"
                                title="Upload Song"
                            >
                                <AtomColumn>
                                    <AtomPrimaryText>
                                        Only audio files (.wav/.mp3/..) are supported
                                    </AtomPrimaryText>
                                    <AtomFileUpload
                                        acceptTypes="audio/*"
                                        onFileChange={handleFileChange}/>
                                </AtomColumn>
                            </AtomDialog>
                            <AtomDropdown
                                options={vizOptions}
                                onClick={handleVisualizerChange}
                                className="h-full w-28 m-auto"
                                placeholder="Select Visualizer"
                                initialIndex={0}
                            />
                            <AtomButton
                                icon={isFullScreen ? "fa fa-compress" : "fa fa-expand"}
                                onClick={handleToggleFullScreen}
                                type={ButtonType.Ghost}
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
            label: 'Lioness',
            value: Lioness,
        } as AtomDropdownItemProps,
        {
            label: 'Flood',
            value: Flood,
        } as AtomDropdownItemProps,
        {
            label: 'STAYinit',
            value: StayInit,
        } as AtomDropdownItemProps
    ];


const defaultVizOptions = [
    {
        label: "Abstract",
        value: VisualizerType.Abstract,
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


export default Muviz;