import React, {useMemo, useRef, useState} from 'react';
import ToolInfo from "../tool-info";
import {AudioPlayer, AudioPlayerProps, useAudioPlayer} from "../../../common/audio";
import {AtomButton} from "../../../atoms/atom-button";
import Logo from '../logos/muviz.svg';
import Cover from '../logos/muviz-cover.svg';
import AtomDropdown, {AtomDropdownItemProps} from "../../../atoms/atom-dropdown";

import CallingON from './sample-music/calling.mp3';
import CanYouFeelIt from './sample-music/can_u_feel_it.mp3';
import Uneath from './sample-music/uneath.mp3';

import {Canvas, CanvasController} from "../../../atoms/canvas";
import AtomSlider from "../../../atoms/atom-slider";
import {formatTime} from "../../../common/date";
import {BarVisualizer, SpiralVisualizer, toString, VisualizerType} from "./visualizers";
import AtomFileUpload from "../../../atoms/atom-file-upload";
import ModalButton from "../../../atoms/modal-button";
import {toggleFullScreen} from "../../../common/full-screen";
import AppView from "../../../atoms/app-view";

const AppName = 'MUVIZ';

interface MuvizAppProps {
    songOptions: AtomDropdownItemProps[];
    vizOptions: AtomDropdownItemProps[];
}

const MuvizApp: React.FC<MuvizAppProps> = ({songOptions, vizOptions}) => {
    const timeSkip_s = 10;

    // State Management
    const [src, setSrc] = useState<AudioPlayerProps['src']>(null);
    const [visualizerType, setVisualizerType] = useState(VisualizerType.Spiral);
    const [controller, setController] = useState<CanvasController | null>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const appRef = useRef(null);

    // Player Setup
    const player = useAudioPlayer({src: src, makeAnalyzer: true});

    const updateVisualizer = async () => {
        if (!player.analyser || !player.dataArray) {
            return;
        }

        switch (visualizerType) {
            case VisualizerType.Spiral:
                const viz = new SpiralVisualizer({
                    analyser: player.analyser,
                    dataArray: player.dataArray,
                    canvasRef: appRef
                });
                setController(viz);
                break;
            case VisualizerType.Bar:
                setController(new BarVisualizer({
                    analyser: player.analyser,
                    dataArray: player.dataArray,
                    canvasRef: appRef
                }));
                break;
            default:
                throw new Error("Invalid visualizer type");
        }
    }

    const stopController = () => {
        if (controller) {
            controller.stop();
        }
    }

    const handleSampleSongChange = (value: any) => {
        setSrc(value);
        stopController();
        player.pause();
    };

    const handleVisualizerChange = (value: any) => {
        setVisualizerType(value);
        stopController();
        player.pause();
    };

    const handlePlayOrPause = () => {
        if (player.isPlaying) {
            stopController();
            player.pause();
            return;
        }
        updateVisualizer().then(() => player.play());
    };

    const skipForward = () => {
        player.setAudioTime(player.currentTime + timeSkip_s);
    }
    const skipBackward = () => {
        player.setAudioTime(player.currentTime - timeSkip_s);
    }

    const handleToggleFullScreen = () => {
        toggleFullScreen(appRef.current, isFullScreen).then(
            () => {
                setIsFullScreen(!isFullScreen);
            }
        )
    };


    const handleFileChange = (file: string) => {
        if (file) {
            setSrc(file);
        }
    };

    const toggleVolume = () => {
        player.changeVolume(player.volume === 0 ? 0.69 : 0);
    };


    const CenterControls: React.FC<{
        player: AudioPlayer;
        src: AudioPlayerProps['src'];
        skipForward(): void;
        skipBackward(): void;
        handlePlayOrPause(): void;
    }> = ({player, skipForward, skipBackward, handlePlayOrPause}) => (
        <div
            className="flex flex-wrap sm:flex-nowrap w-fit h-fit justify-center
                        items-center gap-4 absolute left-1/2 top-1/2 transform -translate-x-1/2">
            <AtomButton icon="fa-solid fa-arrow-rotate-left"
                        ghostMode={true}
                        size="large"
                        onClick={skipBackward}
                        disabled={!src || player.currentTime < 10}/>
            <AtomButton icon={player.isPlaying ? "fa fa-pause" : "fa fa-play"}
                        disabled={!src} size="large"
                        ghostMode={true} onClick={handlePlayOrPause}/>
            <AtomButton icon="fa-solid fa-arrow-rotate-right"
                        ghostMode={true}
                        size="large"
                        onClick={skipForward}
                        disabled={!src}/>
        </div>
    );

    const hudVisibilityForMd = () => (
        player.isPlaying ? "lg:opacity-0" : "lg:opacity-100");

    const MetadataRow: React.FC<{
        player: AudioPlayer
    }> = ({player}) => (
        <div className="flex flex-wrap sm:flex-nowrap justify-between
                        items-center w-full h-full gap-4">
            <span className="text-base sm:text-lg font-bold">
                {player.title ? player.title : "No Song"}
            </span>
            <span className="text-xs sm:text-sm">
                  {formatTime(player.currentTime)} / {formatTime(player.duration)}
            </span>
        </div>
    );

    const VolumeControl: React.FC<{
        player: AudioPlayer; toggleVolume(): void
    }> = () => (
        <div className="w-fit h-fit flex flex-row">
            <div className='flex flex-row gap-1'>
                <AtomButton
                    ghostMode={true}
                    icon={player.volume === 0 ? "fa-solid fa-volume-xmark" :
                        player.volume > 0.69 ? "fa-solid fa-volume-high" : "fa-solid fa-volume-low"}
                    onClick={toggleVolume}/>
                <AtomSlider value={player.volume} min={0} max={1} step={0.01}
                            onChange={player.changeVolume}/>
            </div>
        </div>);

    const TimeSlider: React.FC<{ player: AudioPlayer }> = () => (
        <AtomSlider
            value={player.currentTime}
            min={0}
            max={player.duration || 0}
            step={0.1}
            onChange={player.setAudioTime}
            className="w-full h-fit"
        />
    );

    const RightControls: React.FC<{
        songOptions: AtomDropdownItemProps[];
        vizOptions: AtomDropdownItemProps[];
        handleToggleFullScreen(): void;
        handleVisualizerChange(value: any): void;
        isFullScreen: boolean;
        handleSampleSongChange(value: any): void;
        handleFileChange(file: string): void;
    }> = () => (
        <div className="w-fit h-full flex flex-row gap-1">
            <AtomDropdown
                options={songOptions}
                dropdownIcon={'fas fa-music'}
                onClick={handleSampleSongChange}
                className="h-full w-fit m-auto"
                placeholder="Select Song"
            />

            <AtomDropdown
                options={vizOptions}
                onClick={handleVisualizerChange}
                className="h-full w-fit m-auto"
                placeholder="Select Visualizer"
                initialIndex={0}
            />
            <ModalButton
                icon="fa-solid fa-plus"
                title="Choose Music"
                className="h-full w-fit m-auto"
                onClick={() => {
                }}
                dialogContent={
                    <div className="flex flex-col gap-2">
                        <span className="text-base">Upload Music</span>
                        <span className="text-xs">Only audio files are supported</span>
                        <AtomFileUpload acceptTypes="audio/*" onFileChange={handleFileChange}/>
                    </div>
                }
            />

            <AtomButton
                icon={isFullScreen ? "fa fa-compress" : "fa fa-expand"}
                ghostMode={true}
                className="h-full w-fit m-auto"
                onClick={handleToggleFullScreen}
            />
        </div>);


    return (
        <div className="h-full w-full justify-center align-center" ref={appRef}>
            <Canvas
                controller={controller}
                className="absolute top-0 left-0 w-full h-full"
            />
            <div
                className={`inline-block w-full h-full z-5 p-4 
                            hover:opacity-100 sm:opacity-100 ${hudVisibilityForMd}`}
            >
                <CenterControls
                    player={player}
                    src={src}
                    skipForward={skipForward}
                    skipBackward={skipBackward}
                    handlePlayOrPause={handlePlayOrPause}
                />

                <div className="flex flex-col gap-4 w-full h-fit absolute left-0 bottom-0 p-4">
                    <MetadataRow player={player}/>
                    <TimeSlider player={player}/>
                    <div className="flex flex-wrap sm:flex-nowrap justify-between
                                    items-center w-full h-fit">
                        <VolumeControl player={player} toggleVolume={toggleVolume}/>
                        <RightControls
                            songOptions={songOptions}
                            vizOptions={vizOptions}
                            handleToggleFullScreen={handleToggleFullScreen}
                            handleVisualizerChange={handleVisualizerChange}
                            isFullScreen={isFullScreen}
                            handleSampleSongChange={handleSampleSongChange}
                            handleFileChange={handleFileChange}
                        />
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
            name={AppName}
            logo={Logo}
            children={
                <MuvizApp songOptions={defaultSongOptions} vizOptions={defaultVizOptions}/>
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
            cover: Cover,
            componentConstructor: () => (<MuvizView/>)
        });
    }
}


// We keep everything private and only expose the instance.
const muvizInstance = new Muviz();
export default muvizInstance;