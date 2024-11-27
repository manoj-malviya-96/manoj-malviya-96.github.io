import React from 'react';
import FullScreenPage from "../../base/full-page";
import ToolInfo from "./tool-info";
import useAudio from "../../utils/audio";
import PrimaryButton from "../../base/primary-button";
import Logo from './muviz.svg';


const MuvizHUD = ({src}) => {
    const { isPlaying, togglePlayPause } = useAudio(src);
    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md">
            <PrimaryButton
                icon={isPlaying ? 'fa fa-pause' : 'fa fa-play'}
                label={isPlaying ? 'Pause' : 'Play'}
                onClick={togglePlayPause}>
            </PrimaryButton>
        </div>
    );
}

const MuvizView = () => {
    return (
        <FullScreenPage
            name="muviz"
            title="Muviz"
            children={
                <MuvizHUD src='./sample-music/calling.mp3'/>
            }
        />
    );
}

class Muviz extends ToolInfo {
    constructor() {
        super({
            id: 'muviz',
            name: 'Muviz',
            description: 'music + stunning visuals',
            iconPng: Logo,
            componentConstructor: () => (<MuvizView/>)
        });
    }
}

// We keep everything private and only expose the instance.

const muvizInstance = new Muviz;
export default muvizInstance;