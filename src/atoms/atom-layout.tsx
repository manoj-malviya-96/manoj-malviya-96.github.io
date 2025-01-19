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
}

interface AtomLayoutProps {
	className?: string;
	size?: AtomLayoutSize;
	gap?: AtomLayoutGap;
	smallDeviceAdjustment?: boolean;
	alignment?: AtomLayoutAlignment;
	onClick?: () => void;
	children: React.ReactNode;
}

export const AtomRow: React.FC<AtomLayoutProps> = React.memo(({
	                                                              className = '',
	                                                              gap = AtomLayoutGap.Medium,
	                                                              size = AtomLayoutSize.FullHeight,
	                                                              smallDeviceAdjustment = false,
	                                                              alignment = AtomLayoutAlignment.Center,
	                                                              onClick,
	                                                              children
                                                              }) => {
	return (
		<div
			className={`flex ${smallDeviceAdjustment ? 'flex-col md:flex-row' : 'flex-row'} ${size} ${gap} ${className} ${alignment}`}
			onClick={onClick}>
			{children}
		</div>
	);
});

export const AtomColumn: React.FC<AtomLayoutProps> = React.memo(({
	                                                                 className = '',
	                                                                 gap = AtomLayoutGap.Medium,
	                                                                 size = AtomLayoutSize.FullWidth,
	                                                                 smallDeviceAdjustment = false,
	                                                                 alignment = AtomLayoutAlignment.Center,
	                                                                 onClick,
	                                                                 children
                                                                 }) => {
	return (
		<div className={`flex flex-col ${size} ${gap} ${className} ${alignment} ${smallDeviceAdjustment ? 'flex-wrap' : ''}`}
		     onClick={onClick}>
			{children}
		</div>
	);
});


export enum GridColumns {
	One = 'grid-cols-1',
	Two = 'grid-cols-1 md:grid-cols-2',
	Three = 'grid-cols-2 md:grid-cols-3',
	Four = 'grid-cols-3 md:grid-cols-4',
	Five = 'grid-cols-4 md:grid-cols-5',
	Six = 'grid-cols-5 md:grid-cols-6',
}


interface AtomGridProps extends AtomLayoutProps {
	nCols?: GridColumns;
}


export const AtomGrid: React.FC<AtomGridProps> = React.memo(({
	                                                             nCols = GridColumns.Two,
	                                                             className = '',
	                                                             alignment = AtomLayoutAlignment.Center,
	                                                             size = AtomLayoutSize.Fit,
	                                                             gap = AtomLayoutGap.Medium,
	                                                             onClick,
	                                                             children
                                                             }) => {
	return (
		<div
			className={`grid ${nCols} ${gap} ${size} ${alignment} ${className} p-0 m-0`}
			onClick={onClick}
		>
			{children}
		</div>
	);
});


interface DividerProps {
	className?: string
}

export const AtomRowDivider = ({className}: DividerProps) => {
	return (
		<hr className={`w-full border-neutral border-opacity-50 ${className}`}/>
	)
}

export const AtomColumnDivider = ({className}: DividerProps) => {
	return (
		<hr className={`h-full border-neutral border-opacity-50 ${className}`}/>
	)
}




