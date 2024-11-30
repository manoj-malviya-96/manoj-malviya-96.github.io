import React from 'react';
import FullScreenPage from "../base/full-page";
import {useNavigate} from "react-router-dom";
import {registeredTools} from "./tools/tool-registry";
import {BentoboxSizeOption} from "../utils/enums";
import {createBentoBoxItem, rangesTo} from "../utils/types";
import BentoBox from "../base/bento-box";


const Tools = () => {
    const navigate = useNavigate();
    const toolListAsBentoBox = rangesTo(registeredTools, (tool)=>
        createBentoBoxItem({
            title: tool.name,
            description: tool.description,
            logo: tool.logo,
            size: BentoboxSizeOption.Regular,
            onClickArg: tool.path,
            hasBorder: true
        })
    );
    const handleCardClick = (path) => {
        navigate(path);
    };
    return (
        <FullScreenPage
            name="tools"
            title="Tools"
            children={<BentoBox items={toolListAsBentoBox} onClick={handleCardClick}
                                itemHeight={320}  squareTiles={true}/>}
        />
    );
}

export default Tools;


