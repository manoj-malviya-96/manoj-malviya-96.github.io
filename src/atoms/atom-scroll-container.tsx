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
		<div className={` overflow-scroll scrollbar-thin
		    scrollbar-thumb-gray-500 scrollbar-track-gray-100
            ${className}`}
		>
			{children}
		</div>
	);
};
export default AtomScrollContainer;