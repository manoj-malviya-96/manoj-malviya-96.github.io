import React from 'react';
import FullScreenPage from "../atoms/full-page";
import {registeredTools} from "./tools/tool-registry";
import {rangesTo} from "../common/types";
import {AtomCarousel} from "../atoms/atom-carousel";
import {AtomCardProps} from "../atoms/atom-card";
import {openLink} from "../common/links";
import {useNavigate} from "react-router-dom";


const ToolDrawer = () => {
    const navigate = useNavigate();

    const items = rangesTo(registeredTools, (tool) => {
        return {
            title: tool.name,
            description: tool.description,
            image: tool.cover,
            onClick: () => navigate(tool.path),
        };
    });

    return (
        <FullScreenPage
            name="tools"
            title="Tools"
            children={<AtomCarousel items={items}/>}
        />
    );
}

export default ToolDrawer;


