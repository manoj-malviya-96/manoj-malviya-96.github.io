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
                    <h1 className="text-4xl font-bold">Muviz</h1>
                    <p className="text-lg mt-4">Coming soon...</p>
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

const muvizInstance = new Muviz;
export default muvizInstance;