import React from 'react';
import {useTheme} from "./theme";
import {AtomButton} from "../atoms/atom-button";
import {useNavigate} from "react-router-dom";
import AtomToolbar from "../atoms/atom-toolbar";

const Navbar = () => {
    const navigate = useNavigate();
    const {currentTheme, currentThemeDetails, cycleTheme, themeEnabled} = useTheme();
    return (
        <AtomToolbar
            end={(
                <div className='flex flex-row gap-2'>
                    <AtomButton
                        label="Home"
                        icon="pi pi-home"
                        onClick={() => navigate("/")}
                    />
                    <AtomButton
                        icon={currentThemeDetails.icon}
                        label={currentTheme}
                        onClick={cycleTheme}
                        disabled={!themeEnabled}
                    />
                </div>
            )
            }
        />
    );
};

export default Navbar;
