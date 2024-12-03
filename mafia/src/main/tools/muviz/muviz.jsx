import React, {useState} from 'react';
import FullScreenPage from "../../../base/full-page";
import ToolInfo from "../tool-info";
import {useAudio} from "../../../utils/audio";
import PrimaryButton from "../../../base/primary-button";
import Logo from '../logos/muviz.svg';
import Cover from '../logos/muviz-cover.svg';
import Dropdown from "../../../base/dropdown";
import {ButtonOptions, DropdownOptions} from "../../../utils/enums";

import CallingON from './sample-music/calling.mp3';
import CanYouFeelIt from './sample-music/can_u_feel_it.mp3';
import {createDropdownItem, rangesTo} from "../../../utils/types";
import {TopBrandLogo} from "../../top-modal";
import {Canvas, CanvasController} from "../../../base/canvas";
import Slider from "../../../base/slider";
import {formatTime} from "../../../utils/date";
import {BarVisualizer, SpiralVisualizer, VisualizerOptions} from "./visualizers";

const AppName = 'MUVIZ';

const MuvizApp = () => {
    const sampleOptions =
        [
            createDropdownItem({
                label: 'calling on',
                value: CallingON
            }),
            createDropdownItem({
                label: 'can you feel it',
                value: CanYouFeelIt,
            })
        ];
    const vizOptions = rangesTo(Object.keys(VisualizerOptions), (key) => {
        return createDropdownItem({label: key, value: VisualizerOptions[key]});
    });
    const timeSkip_s = 10;

    const [src, setSrc] = useState(null);
    const {
        analyser, dataArray, isPlaying, currentTime,
        duration, play, pause, setAudioTime
    } = useAudio({src: src, makeAnalyzer: true});
    const [visualizerType, setVisualizerType] = useState(VisualizerOptions.Bar);
    const [controller, setController] = useState(null);

    const updateVisualizer = async() => {
        if (!controller && !!analyser && !!dataArray) {
            switch (visualizerType) {
                case VisualizerOptions.Spiral:
                    const viz = new SpiralVisualizer({analyser, dataArray});
                    console.log("Setting controller", viz);
                    await setController(viz);
                    break;
                case VisualizerOptions.Bar:
                    await setController(new BarVisualizer({analyser, dataArray}));
                    break;
                default:
                    throw new Error("Invalid visualizer type");
            }
        }
    }

    const handleSampleSongChange = (option) => {
        setSrc(option.value);
        setController(null); // Reset the visualizer when switching tracks
        pause();
    };

    const handleVisualizerChange = (option) => {
        setVisualizerType(option.value);
        setController(null); // Reset the visualizer when switching types
        pause();
    };

    const handlePlayOrPause = () => {
        if (isPlaying) {
            setController(null); // Reset the visualizer when pausing
            pause();
            return;
        }
        updateVisualizer().then(() => play());
    };

    const skipForward = () => {
        setAudioTime(currentTime + timeSkip_s);
    }
    const skipBackward = () => {
        setAudioTime(currentTime - timeSkip_s);
    }

    const hudVisibilityForMd = isPlaying ? "md:opacity-0" : "md:opacity-100";

    return (
        <div className="h-full w-full border-2 justify-center align-center">
            {/* Canvas covers the full screen */}
            {
                <Canvas
                    controller={controller}
                    className="absolute top-0 left-0 w-full h-full"
                />
            }

            <div className={`flex flex-col h-fit justify-between m-auto backdrop-blur-md z-10
                            gap-2 absolute bottom-10 left-1/2 transform -translate-x-1/2
                            bg-base-100 bg-opacity-60 rounded-lg
                            p-4 hover:opacity-100 sm:opacity-100  ${hudVisibilityForMd} w-4/5 `}>
                <Slider
                    value={currentTime}
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    onChange={setAudioTime}
                    className="w-full h-fit"
                />

                <div className="flex justify-between items-center">
                    <div className="flex flex-row gap-2 justify-center align-center">
                        <span className="text-lg font-bold justify-center">{"Unknown Song"}</span>
                        <span className="text-sm m-auto">{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>


                    <div className="flex flex-row gap-4">
                        <PrimaryButton
                            icon="fa-solid fa-arrow-rotate-left"
                            style={ButtonOptions.Style.Ghost}
                            state={src ? ButtonOptions.State.None : ButtonOptions.State.Disabled}
                            onClick={skipBackward}
                        />
                        {/* Play/Pause Button */}
                        <PrimaryButton
                            icon={isPlaying ? "fa fa-pause" : "fa fa-play"}
                            state={src ? ButtonOptions.State.None : ButtonOptions.State.Disabled}
                            onClick={handlePlayOrPause}
                        />
                        <PrimaryButton
                            icon="fa-solid fa-arrow-rotate-right"
                            style={ButtonOptions.Style.Ghost}
                            state={src ? ButtonOptions.State.None : ButtonOptions.State.Disabled}
                            onClick={skipForward}
                        />
                    </div>

                    <div className="flex flex-row align-center ">
                        {/* Song Selector */}
                        <Dropdown
                            options={sampleOptions}
                            direction={DropdownOptions.Direction.Up}
                            buttonSize={DropdownOptions.Size.Small}
                            buttonStyle={DropdownOptions.Style.Ghost}
                            onClick={handleSampleSongChange}
                            className="h-full w-fit m-auto"
                            placeholder="Select Song"
                        />

                        {/* Viz Selector */}
                        <Dropdown
                            options={vizOptions}
                            direction={DropdownOptions.Direction.Up}
                            buttonSize={DropdownOptions.Size.Small}
                            buttonStyle={DropdownOptions.Style.Ghost}
                            onClick={handleVisualizerChange}
                            className="h-full w-fit m-auto"
                            placeholder="Select Visualizer"
                            initialIndex= {0}
                        />

                        {/* Fullscreen Toggle */}
                        <PrimaryButton
                            icon="fa fa-expand"
                            style={ButtonOptions.Style.Ghost}
                            className="m-auto"
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