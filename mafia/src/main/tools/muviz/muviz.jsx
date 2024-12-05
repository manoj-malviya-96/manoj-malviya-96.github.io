import React, {useRef, useState} from 'react';
import FullScreenPage from "../../../base/full-page";
import ToolInfo from "../tool-info";
import {AudioPlayer} from "../../../utils/audio";
import PrimaryButton from "../../../base/primary-button";
import Logo from '../logos/muviz.svg';
import Cover from '../logos/muviz-cover.svg';
import Dropdown from "../../../base/dropdown";
import {ButtonOptions, DropdownOptions, SliderOptions} from "../../../utils/enums";

import CallingON from './sample-music/calling.mp3';
import CanYouFeelIt from './sample-music/can_u_feel_it.mp3';
import Uneath from './sample-music/uneath.mp3';
import {createDropdownItem, rangesTo} from "../../../utils/types";
import {TopBrandLogo} from "../../top-modal";
import {Canvas} from "../../../base/canvas";
import Slider from "../../../base/slider";
import {formatTime} from "../../../utils/date";
import {BarVisualizer, SpiralVisualizer, VisualizerOptions} from "./visualizers";
import FileUpload from "../../../base/file-upload";
import ModalButton from "../../../base/modal-button";

const AppName = 'MUVIZ';

const MuvizApp = () => {
    const sampleOptions =
        [
            createDropdownItem({
                label: 'calling on',
                value: CallingON,
                icon: 'fas fa-music'
            }),
            createDropdownItem({
                label: 'can you feel it',
                value: CanYouFeelIt,
                icon: 'fas fa-music'
            }),
            createDropdownItem({
                label: 'underneath it all',
                value: Uneath,
                icon: 'fas fa-music'
            })
        ];

    const vizOptions = rangesTo(Object.keys(VisualizerOptions), (key) => {
        return createDropdownItem({
            label: key, value: VisualizerOptions[key],
            icon: 'fa-solid fa-bolt-lightning'
        });
    });
    const timeSkip_s = 10;


    // State Management
    const [src, setSrc] = useState(null);

    const player = AudioPlayer({src: src, makeAnalyzer: true});

    const [visualizerType, setVisualizerType] = useState(VisualizerOptions.Bar);
    const [controller, setController] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const appRef = useRef(null);

    const updateVisualizer = async () => {
        if (!!player.analyser && !!player.dataArray) {
            switch (visualizerType) {
                case VisualizerOptions.Spiral:
                    const viz = new SpiralVisualizer({
                        analyser: player.analyser,
                        dataArray: player.dataArray
                    });
                    await setController(viz);
                    break;
                case VisualizerOptions.Bar:
                    await setController(new BarVisualizer({
                        analyser: player.analyser,
                        dataArray: player.dataArray
                    }));
                    break;
                default:
                    throw new Error("Invalid visualizer type");
            }
        }
    }

    const stopController = () => {
        if (controller) {
            controller.stop();
        }
    }

    const handleSampleSongChange = (option) => {
        setSrc(option.value);
        stopController();
        player.pause();
    };

    const handleVisualizerChange = (option) => {
        setVisualizerType(option.value);
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

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            appRef.current.requestFullscreen().then(() => setIsFullScreen(true));
        } else {
            window.document.exitFullscreen().then(() => setIsFullScreen(false));
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSrc(URL.createObjectURL(file));
        }
    };

    const toggleVolume = () => {
        player.changeVolume(player.volume === 0 ? 0.69 : 0);
    };

    const hudVisibilityForMd = player.isPlaying ? "lg:opacity-0" : "lg:opacity-100";

    return (
        <div className="h-full w-full justify-center align-center" ref={appRef}>
            <Canvas
                controller={controller}
                className="absolute top-0 left-0 w-full h-full"
            />
            <div
                className={`flex flex-col h-fit justify-between m-auto backdrop-blur-md z-10
                        gap-2 absolute bottom-4 left-1/2 transform -translate-x-1/2
                        bg-base-100 bg-opacity-30 rounded-lg
                        p-4 hover:opacity-100 sm:opacity-100 ${hudVisibilityForMd} w-full md:w-4/5`}
            >
                <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full h-full gap-4">
                    <span className="text-base sm:text-lg font-bold">{player.title}</span>
                    <span className="text-xs sm:text-sm">
                            {formatTime(player.currentTime)} / {formatTime(player.duration)}
                    </span>
                </div>
                <Slider
                    value={player.currentTime}
                    min={0}
                    max={player.duration || 0}
                    step={0.1}
                    onChange={player.setAudioTime}
                    style={SliderOptions.Style.Info}
                    className="w-full h-fit"
                />

                <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full h-full gap-4">
                    <div className="flex flex-row gap-1 sm:gap-4">
                        <PrimaryButton
                            icon="fa-solid fa-arrow-rotate-left"
                            style={ButtonOptions.Style.Ghost}
                            state={src ? ButtonOptions.State.None : ButtonOptions.State.Disabled}
                            onClick={skipBackward}
                        />
                        <PrimaryButton
                            icon={player.isPlaying ? "fa fa-pause" : "fa fa-play"}
                            state={src ? ButtonOptions.State.None : ButtonOptions.State.Disabled}
                            onClick={handlePlayOrPause}
                        />
                        <PrimaryButton
                            icon="fa-solid fa-arrow-rotate-right"
                            style={ButtonOptions.Style.Ghost}
                            state={src ? ButtonOptions.State.None : ButtonOptions.State.Disabled}
                            onClick={skipForward}
                        />
                        <div className='flex flex-row gap-1'>
                            <PrimaryButton icon={player.volume === 0 ? "fa-solid fa-volume-xmark" :
                                player.volume > 0.69 ? "fa-solid fa-volume-high" : "fa-solid fa-volume-low"}
                                           style={ButtonOptions.Style.Ghost}
                                           onClick={toggleVolume}/>
                            <Slider value={player.volume} min={0} max={1} step={0.01} onChange={player.changeVolume}/>
                        </div>
                    </div>

                    <div className="w-fit h-full flex flex-row gap-1">
                        <Dropdown
                            options={sampleOptions}
                            direction={DropdownOptions.Direction.Up}
                            buttonSize={DropdownOptions.Size.Small}
                            buttonStyle={DropdownOptions.Style.Ghost}
                            onClick={handleSampleSongChange}
                            className="h-full w-fit m-auto"
                            placeholder="Select Song"
                        />

                        <Dropdown
                            options={vizOptions}
                            direction={DropdownOptions.Direction.Up}
                            buttonSize={DropdownOptions.Size.Small}
                            buttonStyle={DropdownOptions.Style.Ghost}
                            onClick={handleVisualizerChange}
                            className="h-full w-fit m-auto"
                            placeholder="Select Visualizer"
                            initialIndex={0}
                        />
                        <ModalButton
                            icon="fa-solid fa-plus"
                            title="Choose Music"
                            className="h-full w-fit m-auto"
                            dialogContent={
                                <div className="flex flex-col gap-2">
                                    <span className="text-base">Upload Music</span>
                                    <span className="text-xs">Only audio files are supported</span>
                                    <FileUpload acceptTypes="audio/*" onFileChange={handleFileChange}/>
                                </div>
                            }
                            dialogAction={() => {
                            }}
                        />

                        <PrimaryButton
                            icon={isFullScreen ? "fa fa-compress" : "fa fa-expand"}
                            style={ButtonOptions.Style.Ghost}
                            className="h-full w-fit m-auto"
                            onClick={toggleFullScreen}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const MuvizView = () => {
    return (
        <FullScreenPage
            name="muviz"
            title=""
            children={
                <div className="w-full h-fit">
                    <TopBrandLogo logo={Logo} name={AppName}/>
                    <MuvizApp/>
                </div>
            }
        />
    );
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