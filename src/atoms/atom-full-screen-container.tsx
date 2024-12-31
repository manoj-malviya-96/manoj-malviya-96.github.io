import React, {ReactNode} from 'react';
import {Element} from 'react-scroll';
import {AtomPrimaryText, AtomSuperHeroTitleText} from "./atom-text";

interface FullScreenPageProps {
	name: string;
	title?: string;
	description?: string;
	children?: ReactNode;
	childrenAlignment?: string; // Example: 'justify-center
                                // items-center'
	backgroundImage?: string;
}

const AtomFullScreenContainer: React.FC<FullScreenPageProps> = React.memo(({
	                                                                           name,
	                                                                           title,
	                                                                           description,
	                                                                           children,
	                                                                           childrenAlignment,
	                                                                           backgroundImage,
                                                                           }) => {
	if (!name) {
		throw new Error("The 'name' prop is required for FullScreenPage.");
	}
	
	const alignmentClasses = childrenAlignment
		? `flex ${childrenAlignment}`
		: 'flex justify-center items-center';
	
	return (
		<Element
			className="h-fit min-h-screen w-screen flex flex-col p-0 m-0 overflow-clip justify-center"
			name={name}
			style={{
				margin: 0, // Remove margin
				padding: 0, // Remove padding
				backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{/* Title */}
			{title &&
                <AtomSuperHeroTitleText text={title} className={'mx-auto'}/>
			}
			
			{/* Description */}
			{description && (
				<AtomPrimaryText text={description} className={'mx-auto mt-4 text-center w-1/2'}/>
			)}
			
			{/* Children */}
			{children && (
				<div
					className={`p-4 w-fit max-w-full h-fit mx-auto ${alignmentClasses}`}>
					{children}
				</div>
			)}
		</Element>
	);
});

export default AtomFullScreenContainer;
