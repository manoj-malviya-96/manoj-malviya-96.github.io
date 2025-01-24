import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import AtomButton, { ButtonSize } from "./atom-button";
import { useKeyboardManager } from "../providers/keyboard";
import { AtomSecondaryText } from "./atom-text";
import { useTheme } from "../providers/theme";
import AtomInViewContainer from "./atom-in-view-container";
import { AtomLoader } from "./atom-loader";
import { PhotoView } from "react-photo-view";

interface AtomImageProps {
  src: string;
  highResSrc?: string;
  alt: string;
  className?: string;
  preview?: boolean;
  showLabel?: boolean;
}

const AtomImage: React.FC<AtomImageProps> = React.memo(
  ({ src, highResSrc, alt, className }) => {
    return (
      <PhotoView
        src={highResSrc || src}
        overlay={
          <div className="absolute bottom-0 left-0 p-4 text-white bg-black/50 w-full">
            <p>{alt}</p>
          </div>
        }
      >
        {/* Thumbnail */}
        <img
          src={src}
          alt={alt}
          className={`cursor-zoom-in rounded-lg shadow-lg object-cover hover:shadow-xl transition-shadow ${className}`}
        />
      </PhotoView>
    );
  },
);

export default AtomImage;

interface AtomSvgProps {
  src: string;
  alt: string;
  className?: string;
}

export const AtomThemeSensitiveImage: React.FC<AtomSvgProps> = React.memo(
  ({ src, alt, className }) => {
    const { isDark } = useTheme();
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="eager"
        style={{ filter: isDark ? "brightness(121%)" : "" }}
      />
    );
  },
);

interface AtomBackgroundImageProps {
  src?: string;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const AtomBackgroundImage: React.FC<AtomBackgroundImageProps> = ({
  src,
  children,
  className,
  onClick,
}) => (
  <div
    className={className}
    style={
      src
        ? {
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }
        : undefined
    }
    onClick={onClick}
  >
    {children}
  </div>
);
