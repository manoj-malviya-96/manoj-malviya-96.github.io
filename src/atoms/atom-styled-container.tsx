import React from 'react'
import {AtomTertiaryText} from "./atom-text";

interface AtomStyledContainerProps {
	label?: string;
	children: React.ReactNode;
	className?: string;
	hug?: boolean;
}

const AtomStyledContainer: React.FC<AtomStyledContainerProps> = ({
	                                                                 label,
	                                                                 children,
	                                                                 hug = false,
	                                                                 className = ''
                                                                 }) => {
	return (
		<div className={`flex flex-col gap-1 ${className}`}>
			{label && <AtomTertiaryText>{label}</AtomTertiaryText>}
			<div
				className={`inline-block ${hug ? 'p-0 gap-0' : 'p-4 gap-4'}
                        rounded-md hover:shadow
                        bg-neutral bg-opacity-5
                        border border-neutral border-opacity-50
                        backdrop-blur-lg`}>
				{children}
			</div>
		</div>
	);
};

export default AtomStyledContainer;