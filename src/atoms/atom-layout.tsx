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
	ExtraSmall = 'gap-2',
	Small = 'gap-4',
	Medium = 'gap-8',
	Large = 'gap-16',
	ExtraLarge = 'gap-32',
}

export enum AtomLayoutAlignment {
	None = '',
	Center = 'items-center justify-center',
	Start = 'items-start justify-start',
	End = 'items-end justify-end',
	HStart = 'items-center justify-start',
	HEnd = 'items-center justify-end',
	VStart = 'items-start justify-center',
	VEnd = 'items-end justify-center',
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


export const AtomGrid3: React.FC<AtomLayoutProps> = React.memo(({
			                                                                 className = '',
	                                                                 gap = AtomLayoutGap.Medium,
	                                                                 size = AtomLayoutSize.Fit,
	                                                                 alignment = AtomLayoutAlignment.Center,
	                                                                 onClick,
	                                                                 children
																 }) => {
	return (
		<div className={`grid grid-cols-3 ${size} ${gap} ${className} ${alignment}`}
		     onClick={onClick}>
			{children}
		</div>
	);
});

export const AtomGrid5: React.FC<AtomLayoutProps> = React.memo(({
			                                                                 className = '',
	                                                                 gap = AtomLayoutGap.Medium,
	                                                                 size = AtomLayoutSize.Fit,
	                                                                 alignment = AtomLayoutAlignment.Center,
	                                                                 onClick,
	                                                                 children
																 }) => {
	return (
		<div className={`grid grid-cols-5 ${size} ${gap} ${className} ${alignment}`}
		     onClick={onClick}>
			{children}
		</div>
	);
});



