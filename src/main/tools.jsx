import React from 'react';
import FullScreenPage from "../atoms/full-page";
import {useNavigate} from "react-router-dom";
import {registeredTools} from "./tools/tool-registry";
import {rangesTo} from "../utils/types";
import {createCarouselItem, AtomCarousel} from "../atoms/atom-carousel";


const Tools = () => {
    const navigate = useNavigate();
    const items = rangesTo(registeredTools, (tool) =>
        createCarouselItem({
            title: tool.name,
            description: tool.description,
            logo: tool.logo,
            onClickArg: tool.path,
        })
    );
    const handleCardClick = (path) => {
        navigate(path);
    };
    return (
        <FullScreenPage
            name="tools"
            title="Tools"
            children={<AtomCarousel items={items} onClick={handleCardClick}/>}
        />
    );
}

export default Tools;


