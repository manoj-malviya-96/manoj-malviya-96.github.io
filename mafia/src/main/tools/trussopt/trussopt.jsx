import FullScreenPage from "../../../atoms/full-page";
import ToolInfo from "../tool-info";
import Logo from '../logos/trussopt.svg';
import Cover from '../logos/trussopt-cover.svg';
import {TopBrandLogo} from "../../top-modal";
import React from "react";
import Plotter from "../../../atoms/plotter";
import AtomButton from "../../../atoms/atom-button";

const AppName = 'TrussOPT';


const TrussPlot = () => {
    return (
        <Plotter
            dataTrace={[]}
            width='100%'
            height='100%'
        />
    )
}

const TrussOptApp = () => {
    return (
        <div className="h-full w-full justify-center align-center">
            <TrussPlot />
            <div
                className={`flex flex-col h-fit justify-between m-auto backdrop-blur-md gap-2 absolute bottom-0 
                        left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        bg-base-100 bg-opacity-30 rounded-lg border-2 border-primary border-opacity-25
                        p-4 hover:opacity-100 sm:opacity-100 w-full md:w-4/5`}
            >
                <AtomButton label="Create Truss" onClick={() => {}}/>
            </div>
        </div>
    )
}


const TrussOptView = () => {
    return (
        <FullScreenPage
            name="trussopt"
            title=""
            children={
                <div className="w-full h-fit">
                    <TopBrandLogo logo={Logo} name={AppName}/>
                    <TrussOptApp/>
                </div>
            }
        />
    );
}

class TrussOpt extends ToolInfo {
    constructor() {
        super({
            id: 'truss_opt',
            name: AppName,
            description: 'create, analyze and optimize truss',
            cover: Cover,
            componentConstructor: () => (<TrussOptView/>)
        });
    }
}

// We keep everything private and only expose the instance.

const trussOptInstance = new TrussOpt();
export default trussOptInstance;