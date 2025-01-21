import React from "react";


interface MouseAreaProps {
	className: string;
	onClick?: () => void;
	onHover?: () => void;
	onLeave?: () => void;
	onDragEnter?: () => void;
	onDragLeave?: () => void;
	children?: React.ReactNode;
}

const AtomMouseArea: React.FC<MouseAreaProps> = ({
	                                                 className,
	                                                 onClick,
	                                                 onHover,
	                                                 onLeave,
	                                                 onDragEnter,
	                                                 onDragLeave,
	                                                 children
                                                 }) => {
	return (
		<div
			className={className}
			onClick={onClick}
			onMouseEnter={onHover}
			onMouseLeave={onLeave}
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
		>
			{children}
		</div>
	);
}

export default AtomMouseArea;