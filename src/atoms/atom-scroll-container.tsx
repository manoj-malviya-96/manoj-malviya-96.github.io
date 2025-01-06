import React from "react";

interface ScrollContainerProps {
	className?: string | undefined;
	children: React.ReactNode;
}


const AtomScrollContainer: React.FC<ScrollContainerProps> = ({
	                                                             className,
	                                                             children
                                                             }) => {
	return (
		<div className={`overflow-scroll scrollbar-thin
		    scrollbar-thumb-primary-content scrollbar-track-primary-content
            ${className}`}
		>
			{children}
		</div>
	);
};
export default AtomScrollContainer;