import React from 'react';
import ToolInfo from "../tool-info";
import Logo from '../logos/mesha.svg';
import AppView from "../app-view";
import {AtomHeroTitleText} from "../../../atoms/atom-text";

const AppName = 'MESHA';

const MeshaView = () => {
    return (
        <AppView
            appName={AppName}
            appLogo={Logo}
            children={
                <AtomHeroTitleText text={`Coming soon...`}/>
            }
        />
    )
}

class Mesha extends ToolInfo {
    constructor() {
        super({
            id: 'mesha',
            name: AppName,
            description: 'visualize + analyze + edit your 3D mesh',
            cover: Logo,
            componentConstructor: () => (
                <MeshaView/>
            )
        });
    }
}


// We keep everything private and only expose the instance.
const meshaInstance = new Mesha()
;
export default meshaInstance;