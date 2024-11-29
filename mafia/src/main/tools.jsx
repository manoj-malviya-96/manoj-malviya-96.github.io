import React from 'react';
import FullScreenPage from "../base/full-page";
import PrimaryButton from "../base/primary-button";
import GithubHeatmap from "./tools/github";
import {useNavigate} from "react-router-dom";
import {registeredTools} from "./tools/tool-registry";
import {SizeOptions} from "../utils/enums";
import {createBentoBoxItem, rangesTo} from "../utils/types";
import BentoBox from "../base/bento-box";


const Tools = () => {
    const navigate = useNavigate();
    const toolListAsBentoBox = rangesTo(registeredTools, (tool)=>
        createBentoBoxItem({
            title: tool.name,
            description: tool.description,
            cover: tool.logo,
            size: SizeOptions.Large,
            onClickArg: tool.path
        })
    );
    const handleCardClick = (path) => {
        navigate(path);
    };
    return (
        <FullScreenPage
            name="tools"
            title="Tools"
            children={<BentoBox items={toolListAsBentoBox} onClick={handleCardClick} squareTiles={true}/>}
        />
    );
}

export default Tools;


