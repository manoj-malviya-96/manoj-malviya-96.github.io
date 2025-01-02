import React from 'react';


export enum AtomLayoutSize {
	FullSize = 'w-full h-full',
	FullWidth = 'w-full h-fit',
	FullHeight = 'w-fit h-full',
	Fit = 'w-fit h-fit',
}

export enum AtomLayoutGap {
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
	type?: AtomLayoutSize;
	gap?: AtomLayoutGap;
	alignment?: AtomLayoutAlignment;
	children: React.ReactNode;
}

export const AtomRow: React.FC<AtomLayoutProps> = React.memo(({
	                                                              className = '',
	                                                              gap = AtomLayoutGap.Medium,
	                                                              type = AtomLayoutSize.Fit,
	                                                              alignment = AtomLayoutAlignment.Center,
	                                                              children
                                                              }) => {
	return (
		<div className={`flex flex-col md:flex-row ${type} ${gap} ${className} ${alignment}`}>
			{children}
		</div>
	);
});

export const AtomColumn: React.FC<AtomLayoutProps> = React.memo(({
	                                                                 className = '',
	                                                                 gap = AtomLayoutGap.Medium,
	                                                                 type = AtomLayoutSize.Fit,
	                                                                 alignment = AtomLayoutAlignment.Center,
	                                                                 children
                                                                 }) => {
	return (
		<div className={`flex flex-col ${type} ${gap} ${className} ${alignment}`}>
			{children}
		</div>
	);
});




