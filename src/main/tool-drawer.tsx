import React from 'react';
import FullScreenPage from "../atoms/full-page";
import {registeredTools} from "./tools/tool-registry";
import {rangesTo} from "../common/types";
import {useNavigate} from "react-router-dom";
import AtomCardGrid from "../atoms/atom-card-grid";


const ToolDrawer = () => {
    const navigate = useNavigate();
    
    const items = rangesTo(registeredTools, (tool) => {
        return {
            title: tool.name,
            description: tool.description,
            image: tool.cover,
            onClick: () => navigate(tool.path),
            centerAlign: true,
        };
    });
    
    return (
        <FullScreenPage
            name="tools"
            title="Tools"
            children={<AtomCardGrid items={items}/>}
        />
    );
}

export default ToolDrawer;


