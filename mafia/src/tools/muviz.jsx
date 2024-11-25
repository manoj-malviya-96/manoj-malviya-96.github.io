import React from 'react';
import FullScreenPage from "../base/full-page";
import ToolInfo from "./tool-info";

const MuvizView = () => {
    return (
        <FullScreenPage
            name="muviz"
            title="Muviz"
            children={
                <div className="flex flex-col items-center justify-center h-full">
                </div>
            }
        />
    );
}

class Muviz extends ToolInfo {
    constructor() {
        super({
            id: 'muviz',
            name: 'muviz',
            description: 'music + stunning visuals',
            iconPng: 'fa fa-hooli',
            componentConstructor: () => (<MuvizView/>)
        });
    }
}

// We keep everything private and only expose the instance.

const muvizInstance = new Muviz;
export default muvizInstance;