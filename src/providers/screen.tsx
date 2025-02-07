import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define breakpoints using enums
export enum ScreenSizeBreakPoint {
  Small = 640,
  Medium = 768,
  Large = 1024,
  ExtraLarge = 1280,
  ExtraExtraLarge = 1536,
}

// Define screen sizes using enums
export enum ScreenSizeBreakPointAsString {
  Small = "sm",
  Medium = "md",
  Large = "lg",
  ExtraLarge = "xl",
  ExtraExtraLarge = "2xl",
  ExtraExtraExtraLarge = "3xl",
}

function getScreenBreakpoint(): ScreenSizeBreakPointAsString {
  const width = window.innerWidth;

  if (width < ScreenSizeBreakPoint.Small) {
    return ScreenSizeBreakPointAsString.Small;
  }
  if (width < ScreenSizeBreakPoint.Medium) {
    return ScreenSizeBreakPointAsString.Medium;
  }
  if (width < ScreenSizeBreakPoint.Large) {
    return ScreenSizeBreakPointAsString.Large;
  }
  if (width < ScreenSizeBreakPoint.ExtraLarge) {
    return ScreenSizeBreakPointAsString.ExtraLarge;
  }
  if (width < ScreenSizeBreakPoint.ExtraExtraLarge) {
    return ScreenSizeBreakPointAsString.ExtraExtraLarge;
  }

  return ScreenSizeBreakPointAsString.ExtraExtraExtraLarge; // Default to the
  // largest size
}

export function useScreenSizeBreakpoint(): ScreenSizeBreakPointAsString {
  const [breakpoint, setBreakpoint] = useState<ScreenSizeBreakPointAsString>(
    getScreenBreakpoint(),
  );

  useEffect(() => {
    const handleResize = () => setBreakpoint(getScreenBreakpoint());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}

// Context to provide screen size
export const ScreenSizeContext =
  createContext<ScreenSizeBreakPointAsString | null>(null);

interface ScreenSizeProviderProps {
  children: ReactNode;
}

export function ScreenSizeProvider({ children }: ScreenSizeProviderProps) {
  const breakpoint = useScreenSizeBreakpoint();

  return (
    <ScreenSizeContext.Provider value={breakpoint}>
      {children}
    </ScreenSizeContext.Provider>
  );
}
