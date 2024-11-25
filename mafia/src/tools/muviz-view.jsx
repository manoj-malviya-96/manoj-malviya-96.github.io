import React from 'react';
import FullScreenPage from "../base/full-page";

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

export default MuvizView;