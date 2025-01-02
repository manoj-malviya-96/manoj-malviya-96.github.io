import React from 'react';


export enum AtomLayoutSize {
	None = '',
	FullSize = 'w-full h-full',
	FullWidth = 'w-full h-fit',
	FullHeight = 'w-fit h-full',
	Fit = 'w-fit h-fit',
}

export enum AtomLayoutGap {
	None = 'gap-0',
	Small = 'gap-4',
	Medium = 'gap-8',
	Large = 'gap-16',
	ExtraLarge = 'gap-32',
}

export enum AtomLayoutAlignment {
	Center = 'items-center justify-center',
	Start = 'items-start justify-start',
	End = 'items-end justify-end',
}

interface AtomLayoutProps {
	className?: string;
	size?: AtomLayoutSize;
	gap?: AtomLayoutGap;
	alignment?: AtomLayoutAlignment;
	onClick?: () => void;
	children: React.ReactNode;
}

export const AtomRow: React.FC<AtomLayoutProps> = React.memo(({
	                                                              className = '',
	                                                              gap = AtomLayoutGap.Medium,
	                                                              size = AtomLayoutSize.Fit,
	                                                              alignment = AtomLayoutAlignment.Center,
	                                                              onClick,
	                                                              children
                                                              }) => {
	return (
		<div className={`flex flex-col md:flex-row ${size} ${gap} ${className} ${alignment}`}
		     onClick={onClick}>
			{children}
		</div>
	);
});

export const AtomColumn: React.FC<AtomLayoutProps> = React.memo(({
	                                                                 className = '',
	                                                                 gap = AtomLayoutGap.Medium,
	                                                                 size = AtomLayoutSize.Fit,
	                                                                 alignment = AtomLayoutAlignment.Center,
	                                                                 onClick,
	                                                                 children
                                                                 }) => {
	return (
		<div className={`flex flex-col ${size} ${gap} ${className} ${alignment}`}
		     onClick={onClick}>
			{children}
		</div>
	);
});




