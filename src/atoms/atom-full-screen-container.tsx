import React, {ReactNode} from 'react';
import {Element} from 'react-scroll';

interface FullScreenPageProps {
	name: string;
	children?: ReactNode;
	backgroundImage?: string;
}

const AtomFullScreenContainer: React.FC<FullScreenPageProps> = React.memo(({
	                                                                           name,
	                                                                           children,
	                                                                           backgroundImage,
                                                                           }) => {
	if (!name) {
		throw new Error("The 'name' prop is required for FullScreenPage.");
	}
	
	return (
		<Element
			className="h-fit min-h-screen w-screen flex flex-col p-0
						m-0 justify-center items-center"
			name={name}
			style={{
				overflow: 'visible',
				margin: 0, // Remove margin
				padding: 0,
				backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{/* Children */}
			{children && (
				<div
					className={`px-12 py-4 w-full h-full items-center justify-center`}>
					{children}
				</div>
			)}
		</Element>
	);
});

export default AtomFullScreenContainer;
