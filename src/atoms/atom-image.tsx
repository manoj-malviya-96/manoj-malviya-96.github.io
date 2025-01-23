import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import AtomButton, { ButtonSize, ButtonType } from "./atom-button";
import { useKeyboardManager } from "../providers/keyboard";
import { AtomSecondaryText } from "./atom-text";
import { useTheme } from "../providers/theme";
import AtomInViewContainer from "./atom-in-view-container";
import { AtomLoader } from "./atom-loader";

interface AtomImageProps {
  src: string;
  alt: string;
  className?: string;
  preview?: boolean;
  showLabel?: boolean;
}

const AtomImage: React.FC<AtomImageProps> = React.memo(
  ({ src, alt, preview = true, showLabel = false, className = "" }) => {
    const { addShortcut, removeShortcut } = useKeyboardManager();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [loadImage, setLoadImage] = useState(false);

    const toggleFullScreen = useCallback(
      () => setIsFullScreen((prev) => !prev),
      [setIsFullScreen],
    );

    useEffect(() => {
      if (isFullScreen) {
        addShortcut("Escape", toggleFullScreen);
        return () => {
          removeShortcut("Escape");
        };
      }
    }, [isFullScreen, addShortcut, removeShortcut]);

    return (
      <>
        <AtomInViewContainer
          onInView={() => setTimeout(() => setLoadImage(true), 690)}
        >
          <div
            className={`relative ${className} overflow-clip items-center justify-center`}
          >
            {loadImage && (
              <img
                src={src}
                alt={alt}
                className={"w-full h-full object-cover rounded-md"}
                loading="lazy"
              />
            )}
            {!loadImage && (
              <div className={"w-full h-full justify-center items-center"}>
                <AtomLoader className={"w-full h-full"} />
              </div>
            )}

            {preview && loadImage && (
              <div
                className={`absolute inset-0 bg-primary
                                flex items-center justify-center cursor-pointer
                                opacity-0 hover:bg-opacity-50 hover:opacity-90`}
                onClick={toggleFullScreen}
              >
                <i className={"fas fa-magnifying-glass-plus text-2xl"} />
              </div>
            )}
            {showLabel && (
              <AtomSecondaryText className="text-sm text-neutral">
                {alt}
              </AtomSecondaryText>
            )}
          </div>
        </AtomInViewContainer>

        {/* Full-Screen Overlay */}
        {isFullScreen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-80
            flex justify-center items-center transition-opacity duration-300"
            onClick={toggleFullScreen} // to close it outside the image
          >
            <div className="absolute top-4 right-4">
              <AtomButton
                icon="fas fa-xmark"
                size={ButtonSize.Large}
                type={ButtonType.Ghost}
                onClick={() => {
                  console.log("close");
                  setIsFullScreen(false);
                }}
              />
            </div>
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="max-w-full max-h-full rounded-md shadow-lg object-fill
                                    transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </>
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
