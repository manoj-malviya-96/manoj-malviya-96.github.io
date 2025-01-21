import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define breakpoints using enums
export enum ScreenSizeBreakPoints {
  Small = 640,
  Medium = 768,
  Large = 1024,
  ExtraLarge = 1280,
  ExtraExtraLarge = 1536,
}

// Define screen sizes using enums
export enum ScreenSizes {
  Small = "sm",
  Medium = "md",
  Large = "lg",
  ExtraLarge = "xl",
  ExtraExtraLarge = "2xl",
  ExtraExtraExtraLarge = "3xl",
}

function getScreenBreakpoint(): ScreenSizes {
  const width = window.innerWidth;

  if (width < ScreenSizeBreakPoints.Small) {
    return ScreenSizes.Small;
  }
  if (width < ScreenSizeBreakPoints.Medium) {
    return ScreenSizes.Medium;
  }
  if (width < ScreenSizeBreakPoints.Large) {
    return ScreenSizes.Large;
  }
  if (width < ScreenSizeBreakPoints.ExtraLarge) {
    return ScreenSizes.ExtraLarge;
  }
  if (width < ScreenSizeBreakPoints.ExtraExtraLarge) {
    return ScreenSizes.ExtraExtraLarge;
  }

  return ScreenSizes.ExtraExtraExtraLarge; // Default to the
  // largest size
}

export function useScreenSizeBreakpoint(): ScreenSizes {
  const [breakpoint, setBreakpoint] = useState<ScreenSizes>(
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
export const ScreenSizeContext = createContext<ScreenSizes | null>(null);

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
