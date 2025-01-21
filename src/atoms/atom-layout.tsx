import React from 'react';


export enum LayoutSize {
	None = '',
	FullSize = 'w-full h-full',
	FullWidth = 'w-full h-fit',
	FullHeight = 'w-fit h-full',
	Fit = 'w-fit h-fit',
}

export enum LayoutGap {
	None = 'gap-0',
	Small = 'gap-2',
	Medium = 'gap-4',
	Large = 'gap-8',
}

export enum LayoutAlign {
	None = '',
	Center = 'items-center justify-center',
	Start = 'items-start justify-start',
	HStart = 'items-center justify-start',
	CenterBetween = 'items-center justify-between',
}

interface LayoutProps {
	className?: string;
	size?: LayoutSize;
	gap?: LayoutGap;
	smallDeviceAdjustment?: boolean;
	alignment?: LayoutAlign;
	onClick?: () => void;
	children: React.ReactNode;
}

export const AtomRow: React.FC<LayoutProps> = React.memo(({
	                                                          className = '',
	                                                          gap = LayoutGap.Medium,
	                                                          size = LayoutSize.FullHeight,
	                                                          smallDeviceAdjustment = false,
	                                                          alignment = LayoutAlign.Center,
	                                                          onClick,
	                                                          children
                                                          }) => {
	return (
		<div
			className={`flex ${smallDeviceAdjustment ? 'flex-col md:flex-row' : 'flex-row'}
						${size} ${gap} ${className} ${alignment}`}
			onClick={onClick}>
			{children}
		</div>
	);
});

export const AtomColumn: React.FC<LayoutProps> = React.memo(({
	                                                             className = '',
	                                                             gap = LayoutGap.Medium,
	                                                             size = LayoutSize.FullWidth,
	                                                             smallDeviceAdjustment = false,
	                                                             alignment = LayoutAlign.Center,
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


export enum GridColumns {
	One = 'grid-cols-1',
	Two = 'grid-cols-1 md:grid-cols-1 lg:grid-cols-2',
	Three = 'grid-cols-1 md:grid-cols-2  lg:grid-cols-3',
	Four = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
	Five = 'grid-cols-3 md:grid-cols-4  lg:grid-cols-5',
	Six = 'grid-cols-4 md:grid-cols-5 lg:grid-cols-6',
}


interface AtomGridProps extends LayoutProps {
	nCols?: GridColumns;
}


export const AtomGrid: React.FC<AtomGridProps> = React.memo(({
	                                                             nCols = GridColumns.Two,
	                                                             className = '',
	                                                             alignment = LayoutAlign.Center,
	                                                             size = LayoutSize.Fit,
	                                                             gap = LayoutGap.Medium,
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

export const AtomColumnDivider = ({className}: DividerProps) => {
	return (
		<hr className={`w-full border-neutral border-opacity-50 ${className}`}/>
	)
}






