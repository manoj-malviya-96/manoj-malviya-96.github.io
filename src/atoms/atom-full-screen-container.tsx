import React, {ReactNode} from 'react';
import {Element} from 'react-scroll';
import {AtomSuperHeroTitleText} from "./atom-text";

interface FullScreenPageProps {
	name: string;
	title?: string;
	children?: ReactNode;
	childrenAlignment?: string; // Example: 'justify-center
                                // items-center'
	backgroundImage?: string;
}

const AtomFullScreenContainer: React.FC<FullScreenPageProps> = React.memo(({
	                                                                           name,
	                                                                           title,
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
			className="h-fit min-h-screen w-screen flex flex-col p-0
						m-0 overflow-clip justify-center items-center"
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
                <AtomSuperHeroTitleText text={title} className={'mx-auto w-fit lg:w-1/2 mb-8'}/>
			}
			
			{/* Children */}
			{children && (
				<div
					className={`px-12 py-4 w-fit max-w-full h-fit mx-auto ${alignmentClasses}`}>
					{children}
				</div>
			)}
		</Element>
	);
});

export default AtomFullScreenContainer;
