import React from 'react';
import ToolInfo from "../tool-info";
import Logo from '../logos/mesha.svg';
import AppView from "../app-view";
import HeroText from "../../../atoms/hero-text";

const AppName = 'MESHA';

const MeshaView = () => {
    return (
        <AppView
            appName={AppName}
            appLogo={Logo}
            children={
                <div className="w-1/2">
                    <HeroText text={`Mesha is not available right now, Coming soon...`}
                    />
                </div>
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