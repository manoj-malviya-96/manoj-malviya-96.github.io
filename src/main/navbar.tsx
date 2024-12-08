import React from 'react';
import {useTheme} from "./theme";
import {AtomButton} from "../atoms/atom-button";


const Navbar = () => {
    const {currentTheme, currentThemeDetails, cycleTheme, themeEnabled} = useTheme();
    return (
        <div
            className="flex gap-2 p-4 z-10 fixed top-0 right-0 h-fit w-fit overflow-x-hidden"
        >
            <AtomButton
                label="Home"
                icon="pi pi-home"
                onClick={() => {
                    window.location.href = "/";
                }}
            />
            <AtomButton
                icon={currentThemeDetails.icon}
                label={currentTheme}
                onClick={cycleTheme}
                disabled={!themeEnabled}
            />
        </div>
    );
};

export default Navbar;
