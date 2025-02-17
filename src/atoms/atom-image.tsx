import React, { CSSProperties } from "react";
import { AtomPrimaryText } from "./atom-text";
import { useTheme } from "../providers/theme";
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
          <AtomPrimaryText className="absolute bottom-0 left-0 p-4 w-full">
            {alt}
          </AtomPrimaryText>
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
  contain?: boolean;
}

export const AtomBackgroundImage: React.FC<AtomBackgroundImageProps> = ({
  src,
  children,
  className,
  onClick,
  contain = false,
}) => (
  <div
    className={className}
    style={
      src
        ? {
            backgroundImage: `url(${src})`,
            backgroundSize: contain ? "contain" : "cover",
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
