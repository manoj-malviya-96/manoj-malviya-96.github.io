import React, {useState} from 'react';
import FullScreenPage from "../../../base/full-page";
import ToolInfo from "../tool-info";
import useAudio from "../../../utils/audio";
import PrimaryButton from "../../../base/primary-button";
import Logo from '../logos/muviz.svg';
import Cover from '../logos/muviz-cover.svg';
import Dropdown from "../../../base/dropdown";
import {DropdownOptions} from "../../../utils/enums";

import CallingON from './sample-music/calling.mp3';
import CanYouFeelIt from './sample-music/can_u_feel_it.mp3';
import {createDropdownItem} from "../../../utils/types";
import {TopBrandLogo} from "../../top-modal";
import {Canvas, CanvasController} from "../../../base/canvas";
import Slider from "../../../base/slider";
import {formatTime} from "../../../utils/date";

const AppName = 'MUVIZ';


class BarVisualizer extends CanvasController {
    constructor({analyser, dataArray, canvasRef}) {
        super(canvasRef);
        this.analyser = analyser; // Audio analyser node
        this.dataArray = dataArray; // Frequency data array
    }

    draw() {
        if (!this.canvasRef.current || !this.analyser || !this.dataArray) return;

        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        const {width, height} = canvas;

        ctx.clearRect(0, 0, width, height);

        this.analyser.getByteFrequencyData(this.dataArray);

        const barWidth = width / this.dataArray.length;
        this.dataArray.forEach((value, index) => {
            const barHeight = (value / 255) * height;
            ctx.fillStyle = `rgb(${value}, 50, 200)`;
            ctx.fillRect(index * barWidth, height - barHeight, barWidth, barHeight);
        });
    }
}


const MuvizApp = () => {
    const sampleOptions =
        [createDropdownItem({label: 'calling on', value: CallingON}),
            createDropdownItem({
                label: 'can you feel it',
                value: CanYouFeelIt,
            })];

    const [src, setSrc] = useState(null);

    const {
        analyser, dataArray, isPlaying, currentTime,
        duration, play, pause, setAudioTime
    } = useAudio({src: src, makeAnalyzer: true});

    const [controller, setController] = useState(null);

    const handleDropdownClick = (option) => {
        pause();
        setSrc(option.value);
        setController(null); // Reset the visualizer when switching tracks
    };

    const handlePlayOrPause = () => {
        if (isPlaying) {
            pause();
            return;
        }
        if (!controller && analyser && dataArray) {
            const visualizer = new BarVisualizer({analyser, dataArray});
            setController(visualizer);
        }
        play(); // Start music playback
    };

    const hudVisibility = isPlaying ? "opacity-0" : "opacity-100";

    return (
        <div className="h-full w-full">
            {/* Canvas covers the full screen */}
            {controller && (
                <Canvas
                    controller={controller}
                    className="absolute top-0 left-0 w-full h-full"
                />
            )}

            {/* HUD overlays the canvas */}
            <div
                className={`${hudVisibility} hover:opacity-100 flex  w-4/5
                    flex-row gap-4 backdrop-blur-md z-10 items-center transition-opacity duration-300
                    justify-center p-4 rounded-lg shadow-md absolute bottom-10 left-1/2 transform -translate-x-1/2`}
            >
                <PrimaryButton
                    icon={isPlaying ? "fa fa-pause" : "fa fa-play"}
                    onClick={handlePlayOrPause}
                />
                <Slider
                    labelString={`${formatTime(currentTime)}/${formatTime(duration)}`}
                    value={currentTime}
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    onChange={setAudioTime}
                    className="w-3/4 h-16"
                />
                <Dropdown
                    options={sampleOptions}
                    behavior={DropdownOptions.Behavior.Hovered}
                    direction={DropdownOptions.Direction.Up}
                    buttonSize={DropdownOptions.Size.Small}
                    onClick={handleDropdownClick}
                />
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
                <>
                    <TopBrandLogo logo={Logo} name={AppName}/>
                    <MuvizApp/>
                </>
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