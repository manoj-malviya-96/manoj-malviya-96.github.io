import React from 'react';
import FullScreenPage from "../base/full-page";
import PrimaryButton from "../base/primary-button";


const tools = {
    Vibe: {
        description: "A music app that plays music",
        link: "/music",
        icon: "fa fa-music"
    },
    Mesha: {
        description: "A chat app that sends messages",
        link: "/mesha",
        icon: "fa fa-comment"
    },
    Lattice: {
        description: "A chat app that sends messages",
        link: "/lattice",
        icon: "fa fa-apple"
    }
};

const AppDrawer = () => {
    return (
        <div className='grid grid-cols-2 gap-4'>
            {Object.keys(tools).map((toolName) => {
                const tool = tools[toolName];
                return (
                    <PrimaryButton
                        icon={tool.icon}
                        label={toolName}
                        isLarge={true}
                    />
                );
            })}
        </div>
    );
};


const ToolsPage = () => {
    return (
        <FullScreenPage
            name="tools"
            title="Tools"
            children={<AppDrawer/>}
        />
    );
}

export default ToolsPage;


