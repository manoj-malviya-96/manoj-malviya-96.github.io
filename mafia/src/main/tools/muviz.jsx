import React, {useState} from 'react';
import FullScreenPage from "../../base/full-page";
import ToolInfo from "./tool-info";
import useAudio from "../../utils/audio";
import PrimaryButton from "../../base/primary-button";
import Logo from './logos/muviz.svg';
import Cover from './logos/muviz-cover.svg';
import Dropdown from "../../base/dropdown";
import {DropdownOptions, SizeOptions} from "../../utils/enums";

import CallingON from './sample-music/calling.mp3';
import CanYouFeelIt from './sample-music/can_u_feel_it.mp3';
import {createDropdownItem} from "../../utils/types";
import {TopBrandLogo} from "../top-modal";


class MuvizController {
    constructor() {
    }
}

const MuvizHUD = () => {
    const sampleOptions =
        [createDropdownItem({label: 'calling on', value: CallingON}),
            createDropdownItem({
                label: 'can you feel it',
                value: CanYouFeelIt,
            })];

    const [src, setSrc] = useState(sampleOptions[0].value);
    const {isPlaying, pause, togglePlayPause} = useAudio(src);

    const handleDropdownClick = (option) => {
        pause();
        setSrc(option.value);
    }
    const showHUD = isPlaying ? 'opacity-0' : 'opacity-100';
    return (
        <div className={`${showHUD} hover:opacity-100 flex 
                        flex-row gap-2 backdrop-blur-md z-10 items-center transition-opacity duration-300
                        justify-center p-6 rounded-lg shadow-md`}>
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
                onClick={handleDropdownClick}
            />
        </div>
    );
}

const MuvizView = () => {
    return (
        <FullScreenPage
            name="muviz"
            title=""
            children={
            <>
                <TopBrandLogo logo={Logo} name='MUVIZ'  />
                <MuvizHUD/>
            </>
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
            cover: Cover,
            componentConstructor: () => (<MuvizView/>)
        });
    }
}

// We keep everything private and only expose the instance.

const muvizInstance = new Muviz;
export default muvizInstance;