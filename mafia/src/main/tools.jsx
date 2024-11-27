import React from 'react';
import FullScreenPage from "../base/full-page";
import PrimaryButton from "../base/primary-button";
import GithubHeatmap from "./tools/github";
import {useNavigate} from "react-router-dom";
import {registeredTools} from "./tools/tool-registry";
import {ButtonOptions} from "../utils/enums";


const ToolListings = () => {
    const navigate = useNavigate();
    return (
        <div className='grid grid-cols-2 gap-4'>
            {registeredTools.map((info, index) => {
                return (
                    <PrimaryButton
                        key={index}
                        icon={info.icon}
                        label={info.name}
                        roundness={ButtonOptions.Round.Medium}
                        onClick={navigate.bind(null, info.path)}
                    />
                );
            })}
        </div>
    );
};


const Tools = () => {
    return (
        <FullScreenPage
            name="tools"
            title="Tools"
            children={
                <div className="flex flex-col md:flex-row w-full h-fit gap-4">
                    <div className="md:w-1/3 w-full h-full">
                        <ToolListings/>
                    </div>
                    {/* Divider for medium and larger screens */}
                    <div className="hidden md:block w-px bg-secondary bg-opacity-75"></div>
                    <div className="md:w-2/3 w-full h-fit">
                        <GithubHeatmap/>
                    </div>
                </div>
            }
        />
    );
}

export default Tools;


