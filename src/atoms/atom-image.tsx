import React, {useEffect, useState} from "react";
import AtomButton, {ButtonSize, ButtonType} from "./atom-button";
import {useKeyboardManager} from "../providers/keyboard";

interface AtomImageProps {
    src: string;
    alt: string;
    className?: string;
    preview?: boolean;
    showLabel?: boolean;
}

const AtomImage: React.FC<AtomImageProps> = ({
                                                 src,
                                                 alt,
                                                 preview = true,
                                                 showLabel = false,
                                                 className = "",
                                             }) => {
    const {addShortcut, removeShortcut} = useKeyboardManager();
    const [isFullScreen, setIsFullScreen] = useState(false);
    
    const toggleFullScreen = () => setIsFullScreen((prev) => !prev);
    
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
            {/* Normal Image */}
            <div className={`relative ${className}`}>
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className={`cursor-pointer ${preview ? "hover:opacity-90" : ""}`}
                    onClick={preview ? toggleFullScreen : undefined}
                />
                {showLabel && <span className="text-sm text-accent">{alt}</span>}
            </div>
            
            {/* Full-Screen Overlay */}
            {isFullScreen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center transition-opacity duration-300"
                    onClick={toggleFullScreen} // to close it outside the image
                >
                    <div className="absolute top-4 right-4">
                        <AtomButton
                            icon="fas fa-xmark"
                            size={ButtonSize.Large}
                            type={ButtonType.Ghost}
                            onClick={toggleFullScreen}
                        />
                    </div>
                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        className="max-w-full max-h-full rounded-md shadow-lg
                                    transition-transform duration-300"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
};

export default AtomImage;
