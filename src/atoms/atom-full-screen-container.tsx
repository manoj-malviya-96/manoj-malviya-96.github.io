import React, {ReactNode} from 'react';
import {Element} from 'react-scroll';
import {AtomSuperHeroTitleText} from "./atom-text";

interface FullScreenPageProps {
	name: string;
	title?: string;
	children?: ReactNode;
	backgroundImage?: string;
}

const AtomFullScreenContainer: React.FC<FullScreenPageProps> = React.memo(({
	                                                                           name,
	                                                                           title,
	                                                                           children,
	                                                                           backgroundImage,
                                                                           }) => {
	if (!name) {
		throw new Error("The 'name' prop is required for FullScreenPage.");
	}
	
	return (
		<Element
			className="h-fit min-h-screen w-screen inline-block p-0 m-0 "
			name={name}
			style={{
				margin: 0, // Remove margin
				padding: 0,
				backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{/* Title */}
			{title &&
                <AtomSuperHeroTitleText className={'mx-auto w-fit lg:w-1/2 mb-8'}>
                    {title}
                </AtomSuperHeroTitleText>
			}
			
			{/* Children */}
			{children && (
				<div
					className={`px-12 py-4 w-fit max-w-full h-fit mx-auto`}>
					{children}
				</div>
			)}
		</Element>
	);
});

export default AtomFullScreenContainer;
