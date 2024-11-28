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
                        size={ButtonOptions.Size.Large}
                        style={ButtonOptions.Style.Ghost}
                        roundness={ButtonOptions.Round.Medium}
                        hideWhenSmallDevice={false}
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
                <ToolListings/>
            }
        />
    );
}

export default Tools;


