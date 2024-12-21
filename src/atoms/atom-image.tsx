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
    
    const openFullScreen = () => setIsFullScreen(true);
    const closeFullScreen = () => setIsFullScreen(false);
    
    useEffect(() => {
        if (isFullScreen) {
            addShortcut("Escape", closeFullScreen);
            return () => {
                removeShortcut("Escape");
            };
        }
    }, [isFullScreen]);
    
    return (
        <>
            {/* Normal Image */}
            <div
                className={`card flex justify-content-center gap-2 relative ${className}`}
            >
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className={`cursor-pointer ${preview ? "hover:opacity-90" : ""}`}
                    onClick={preview ? openFullScreen : undefined}
                />
                {showLabel && <span className="text-neutral text-sm">{alt}</span>}
            </div>
            
            {/* Full-Screen Overlay */}
            {isFullScreen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50
                                transition-opacity duration-300"
                    onClick={closeFullScreen}
                >
                    <div className="absolute top-4 right-4">
                        <AtomButton icon="fas fa-xmark"
                                    size={ButtonSize.Large}
                                    type={ButtonType.Ghost}
                                    onClick={closeFullScreen}/>
                    </div>
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-full rounded-md shadow-lg transition-transform duration-300"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
};


export default AtomImage;
