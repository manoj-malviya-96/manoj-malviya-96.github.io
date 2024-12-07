import React, {useState, createContext, useEffect} from 'react';

export const ScreenSizeBreakPoints = Object.freeze({
    Small: 640,
    Medium: 768,
    Large: 1024,
    ExtraLarge: 1280,
    ExtraExtraLarge: 1536,
});

export const ScreenSizeBreakPointsPx = Object.freeze({
    Small: `${ScreenSizeBreakPoints.Small}px`,
    Medium: `${ScreenSizeBreakPoints.Medium}px`,
    Large: `${ScreenSizeBreakPoints.Large}px`,
    ExtraLarge: `${ScreenSizeBreakPoints.ExtraLarge}px`,
    ExtraExtraLarge: `${ScreenSizeBreakPoints.ExtraExtraLarge}px`,
});

export const ScreenSizes = Object.freeze({
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
    ExtraLarge: 'xl',
    ExtraExtraLarge: '2xl',
    ExtraExtraExtraLarge: '3xl',
});


function getScreenBreakpoint() {
    const width = window.innerWidth;
    if (width < ScreenSizeBreakPoints.Small) return ScreenSizes.Small;
    if (width < ScreenSizeBreakPoints.Medium) return ScreenSizes.Medium;
    if (width < ScreenSizeBreakPoints.Large) return ScreenSizes.Large;
    if (width < ScreenSizeBreakPoints.ExtraLarge) return ScreenSizes.ExtraLarge;
    if (width < ScreenSizeBreakPoints.ExtraExtraLarge) return ScreenSizes.ExtraExtraLarge;
}

export function useScreenSizeBreakpoint() {
    const [breakpoint, setBreakpoint] = useState(getScreenBreakpoint());

    useEffect(() => {
        const handleResize = () => setBreakpoint(getScreenBreakpoint());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return breakpoint;
}

export const ScreenSizeContext = createContext(null);

export function ScreenSizeProvider({children}) {
    const breakpoint = useScreenSizeBreakpoint();
    return <ScreenSizeContext.Provider value={breakpoint}>{children}</ScreenSizeContext.Provider>;
}





