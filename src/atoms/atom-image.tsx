import React, {useEffect, useState} from "react";
import AtomButton, {ButtonSize, ButtonType} from "./atom-button";
import {useKeyboardManager} from "../providers/keyboard";
import {AtomSecondaryText} from "./atom-text";
import {useTheme} from "../providers/theme";

interface AtomImageProps {
	src: string;
	alt: string;
	className?: string;
	preview?: boolean;
	showLabel?: boolean;
}

const AtomImage: React.FC<AtomImageProps> = React.memo(({
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
			<div className={`relative ${className} overflow-clip items-center justify-center`}>
				<img
					src={src}
					alt={alt}
					loading="lazy"
				/>
				{preview && <div className={`absolute inset-0 bg-primary
                                flex items-center justify-center cursor-pointer
                                opacity-0 hover:bg-opacity-50 hover:opacity-90`}
                                 onClick={toggleFullScreen}
                >
                    <i className={"fas fa-magnifying-glass-plus text-2xl"}/>
                </div>
				}
				{showLabel && <AtomSecondaryText className="text-sm text-neutral" text={alt}/>}
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
});

export default AtomImage;


interface AtomSvgProps {
	src: string;
	alt: string;
	className?: string;
}

export const AtomThemeSensitiveImage: React.FC<AtomSvgProps> = React.memo(({src, alt, className}) => {
	const {isDark} = useTheme();
	return <img src={src} alt={alt}
	            className={className}
	            loading="eager"
	            style={{filter: isDark ? 'brightness(169%)' : ''}}/>;
});
