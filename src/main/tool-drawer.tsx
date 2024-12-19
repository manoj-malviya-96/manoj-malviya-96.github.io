import React from 'react';
import FullScreenPage from "../atoms/full-page";
import {registeredTools} from "./tools/tool-registry";
import {rangesTo} from "../common/math";
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
        };
    });
    
    return (
        <FullScreenPage
            name="tools"
            title="Tools"
        >
            <AtomCardGrid items={items} classNameForCard={'w-48 h-48'}/>
        </FullScreenPage>
    );
}

export default ToolDrawer;


