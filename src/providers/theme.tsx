import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';
import {getColorFromStyle} from "../common/color-utils";

// Define available themes
export const availableThemes = [
    {name: 'Dark', icon: 'fas fa-moon'},
    {name: 'Light', icon: 'fas fa-sun'},
];


// Define the context type
interface ThemeContextType {
    themeEnabled: boolean;
    setThemeEnabled: (value: boolean) => void;
    currentTheme: string;
    currentThemeDetails: { name: string; icon: string };
    cycleTheme: () => void;
    setCurrentTheme: (theme: string) => void;
    daisyPrimary: string;
    daisyPrimaryText: string;
    daisySecondary: string;
    daisyNeutral: string;
    isDark: boolean;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// ThemeProvider Component
export const _ThemeProvider: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    const [themeEnabled, setThemeEnabled] = useState(true);
    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('themeName');
        if (savedTheme && availableThemes.some((theme) => theme.name === savedTheme)) {
            return savedTheme;
        }
        return availableThemes[0].name;
    });
    
    const [themeColors, setThemeColors] = useState({
        daisyPrimary: '',
        daisyPrimaryText: '',
        daisyNeutral: '',
        daisySecondary: '',
    });
    
    // Update theme on the DOM and localStorage
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('themeName', currentTheme);
        
        // Update theme colors when the theme changes
        setThemeColors({
            daisyPrimary: getColorFromStyle('--p'),
            daisyPrimaryText: getColorFromStyle('--pc'),
            daisyNeutral: getColorFromStyle('--n'),
            daisySecondary: getColorFromStyle('--s'),
        });
    }, [currentTheme]);
    
    // Cycle through themes
    const cycleTheme = () => {
        const currentIndex = availableThemes.findIndex((theme) => theme.name === currentTheme);
        const nextIndex = (
                              currentIndex + 1
                          ) % availableThemes.length;
        setCurrentTheme(availableThemes[nextIndex].name);
    };
    
    const currentThemeDetails = availableThemes.find((theme) => theme.name === currentTheme) || availableThemes[0];
    
    return (
        <ThemeContext.Provider
            value={{
                themeEnabled,
                setThemeEnabled,
                currentTheme,
                currentThemeDetails,
                cycleTheme,
                setCurrentTheme,
                daisyPrimary: themeColors.daisyPrimary,
                daisyPrimaryText: themeColors.daisyPrimaryText,
                daisyNeutral: themeColors.daisyNeutral,
                daisySecondary: themeColors.daisySecondary,
                isDark: currentTheme === 'Dark',
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const ThemeProvider = React.memo(_ThemeProvider);
