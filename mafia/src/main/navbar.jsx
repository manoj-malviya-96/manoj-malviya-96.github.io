import React from 'react';
import ThemeButton from "./theme";
import AtomButton from "../atoms/atom-button";

const Navbar = () => {
    return (
        <div
            className="flex gap-2 p-4 z-5 fixed top-0 right-0 h-fit w-fit overflow-x-hidden"
        >
            <AtomButton
                label="Home"
                icon="pi pi-home"
                onClick={() => {
                    window.location.href = "/";
                }}
            />
            <ThemeButton/>
        </div>
    );
};

export default Navbar;
