import React from 'react';
import TabBar from "../base/tab-bar";
import ThemeButton from "./theme";
import PrimaryButton from "../base/primary-button";

const Navbar = () => {
    return (
        <div
            className="flex gap-2 m-4 fixed top-0 right-0 h-fit w-fit z-20 overflow-x-hidden"
        >
            <PrimaryButton
                label="Home"
                icon="fa-solid fa-house-chimney-window"
                onClick={() => {
                    window.location.href = "/";
                }}
            />
            <ThemeButton/>
        </div>
    );
};

export default Navbar;
