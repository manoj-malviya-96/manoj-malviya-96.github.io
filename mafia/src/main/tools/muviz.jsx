import React, {useState} from 'react';
import FullScreenPage from "../../base/full-page";
import ToolInfo from "./tool-info";
import useAudio from "../../utils/audio";
import PrimaryButton from "../../base/primary-button";
import Logo from './muviz.svg';
import Dropdown from "../../base/dropdown";
import {DropdownOptions} from "../../utils/enums";

import CallingON from './sample-music/calling.mp3';
import {createDropdownItem} from "../../utils/types";


class MuvizController {
    constructor() {
    }
}

const MuvizHUD = () => {

    const {src, setSrc} = useState(CallingON);
    const {isPlaying, togglePlayPause} = useAudio(src);

    const sampleOptions =
        [createDropdownItem({label: 'calling on', value: CallingON}),
            createDropdownItem({
                label: 'calling on2222',
                value: CallingON,
            })];
    return (
        <div className="flex flex-row gap-2 backdrop-blur-md z-10 items-center justify-center p-6 rounded-lg shadow-md">
            <PrimaryButton
                icon={isPlaying ? 'fa fa-pause' : 'fa fa-play'}
                onClick={togglePlayPause}>
            </PrimaryButton>
            <Dropdown
                options={sampleOptions}
                behavior={DropdownOptions.Behavior.Hovered}
                direction={DropdownOptions.Direction.Up}
                buttonStyle={DropdownOptions.Style.Outlined}
                buttonSize={DropdownOptions.Size.Small}
                onClick={(option) => setSrc(option.value)}
            />
        </div>
    );
}

const MuvizView = () => {
    return (
        <FullScreenPage
            name="muviz"
            title="Muviz"
            children={
                <MuvizHUD/>
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