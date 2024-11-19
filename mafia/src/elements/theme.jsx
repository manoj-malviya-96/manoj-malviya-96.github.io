import React, { useState, useEffect } from 'react';

const availableThemes = [
    { name: 'lofi', icon: 'fa fa-music' },
    { name: 'black', icon: 'fa fa-moon' },
    { name: 'halloween', icon: 'fa fa-ghost' },
    { name: 'retro', icon: 'fa fa-gamepad' },
];

const ThemeManager = () => {
    // Retrieve the saved theme name from localStorage or default to the first theme
    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('themeName');
        return savedTheme || availableThemes[0].name;
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
        <button
            className="btn btn-primary flex items-center gap-2 px-4 py-2 rounded-full"
            onClick={cycleTheme}
        >
            <i className={`${currentThemeDetails.icon} text-lg`}></i>
            <span className="hidden sm:inline">{currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}</span>
        </button>
    );
};

export default ThemeManager;
