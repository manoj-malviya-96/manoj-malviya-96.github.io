import React, { useState, useEffect } from 'react';

const availableThemes = [
    { name: 'lofi', icon: 'fa fa-music' },
    { name: 'black', icon: 'fa fa-moon' },
    { name: 'emerald', icon: 'fa fa-leaf' },
    { name: 'retro', icon: 'fa fa-gamepad' },
];

const ThemeManager = () => {
    const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

    // Set the theme on mount and whenever the theme changes
    useEffect(() => {
        const currentTheme = availableThemes[currentThemeIndex].name;
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentThemeIndex]);

    // Cycle through themes
    const cycleTheme = () => {
        setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % availableThemes.length);
    };

    const currentTheme = availableThemes[currentThemeIndex];

    return (
        <button
            className="btn btn-primary flex items-center gap-2 px-4 py-2 rounded-full"
            onClick={cycleTheme}
        >
            <i className={`${currentTheme.icon} text-lg`}></i>
            <span>{currentTheme.name.charAt(0).toUpperCase() + currentTheme.name.slice(1)}</span>
        </button>
    );
};

export default ThemeManager;
