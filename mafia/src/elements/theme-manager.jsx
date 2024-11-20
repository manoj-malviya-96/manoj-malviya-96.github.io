import React, {useState, useEffect} from 'react';
import PrimaryButton from "../base/primary-button";

const availableThemes = [
    {name: 'lofi', icon: 'fa fa-music'},
    {name: 'black', icon: 'fa fa-moon'},
    {name: 'nord', icon: 'fa fa-snowflake'},
    {name: 'retro', icon: 'fa fa-gamepad'},
];

const ThemeManager = () => {
    // Retrieve the saved theme name from localStorage or default to the first theme
    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('themeName');
        if (savedTheme && availableThemes.some((theme) => theme.name === savedTheme)) {
            return savedTheme;
        }
        return availableThemes[0].name;
    });

    // Set the theme on mount and whenever the theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('themeName', currentTheme); // Save the theme name to localStorage
    }, [currentTheme]);

    // Cycle through themes
    const cycleTheme = () => {
        const currentIndex = availableThemes.findIndex((theme) => theme.name === currentTheme);
        const nextIndex = (currentIndex + 1) % availableThemes.length;
        setCurrentTheme(availableThemes[nextIndex].name);
    };

    const currentThemeDetails = availableThemes.find((theme) => theme.name === currentTheme);

    return (
        <PrimaryButton
            icon={currentThemeDetails.icon}
            label={currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
            onClick={cycleTheme}
        >
        </PrimaryButton>
    );
};

export default ThemeManager;
