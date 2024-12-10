import React from 'react';
import ToolInfo from "../tool-info";
import Logo from '../logos/trussopt.svg';
import AppView from "../../../atoms/app-view";

const AppName = 'TrussOpt';

const TrussOptView = () => {
    return (
        <AppView
            name={AppName}
            logo={Logo}
            children={<div/>}
        />
    )
}

class TrussOpt extends ToolInfo {
    constructor() {
        super({
            id: 'trussopt',
            name: AppName,
            description: 'create + analyze + optimize your truss',
            cover: Logo,
            componentConstructor: () => (<TrussOptView/>)
        });
    }
}


// We keep everything private and only expose the instance.
const trussOptInstance = new TrussOpt();
export default trussOptInstance;