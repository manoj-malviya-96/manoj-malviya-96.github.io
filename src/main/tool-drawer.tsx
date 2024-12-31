import React from 'react';
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import {registeredTools} from "./tools/tool-registry";
import {rangesTo} from "../common/math";
import {useNavigate} from "react-router-dom";
import {AtomCardGrid} from "../atoms/atom-card";
import AtomGroup from "../atoms/atom-group";


const ToolDrawer = () => {
    const navigate = useNavigate();
    
    const items = rangesTo(registeredTools, (tool) => {
        return {
            title: tool.name,
            description: tool.description,
            image: tool.cover,
            onClick: () => navigate(tool.path),
            centered: true,
        };
    });
    
    return (
        <AtomFullScreenContainer
            name="tools"
            title="Playground"
            description={`I make tools which inspire me to learn and grow. Here are some of them -`}
        >
            <AtomGroup label="Tools">
                <AtomCardGrid
                items={items}
                classNameForCard={'w-48 h-36'}/>
            </AtomGroup>
        </AtomFullScreenContainer>
    );
}

export default ToolDrawer;


