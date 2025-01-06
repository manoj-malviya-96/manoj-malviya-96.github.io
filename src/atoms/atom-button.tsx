import React from 'react';
import AtomSimpleMotionContainer, {HoverScale} from './atom-simple-motion-container';

export enum ButtonSize {
	ExtraSmall = 'btn-xs',
	Small = 'btn-sm text-xs',
	Medium = 'text-md',
	Large = 'btn-lg text-lg',
	ExtraLarge = 'btn-lg text-2xl',
}

export enum ButtonSeverity {
	Primary = 'btn-primary hover:btn-secondary shadow-none',
	Success = 'btn-success border-success',
	Info = 'btn-info border-info',
	Warning = 'btn-warning border-warning',
	Error = 'btn-error border-error',
}

export enum ButtonType {
	Outlined = 'border border-secondary border-opacity-50 bg-opacity-0 hover:bg-opacity-100',
	Ghost = `bg-transparent border-0 hover:bg-transparent hover:text-secondary
            hover:border-0 hover:font-bold active:bg-transparent p-0`,
	Solid = '',
}

export interface AtomButtonProps {
	icon?: string;
	label?: string;
	onClick?: () => void;
	size?: ButtonSize;
	type?: ButtonType;
	severity?: ButtonSeverity;
	tooltip?: string;
	pill?: boolean;
	disabled?: boolean;
	loading?: boolean;
	animated?: boolean;
	className?: string;
}

export const AtomButton: React.FC<AtomButtonProps> = React.memo(({
	                                                                 icon,
	                                                                 label,
	                                                                 onClick,
	                                                                 severity = ButtonSeverity.Primary,
	                                                                 size = ButtonSize.Medium,
	                                                                 type = ButtonType.Solid,
	                                                                 tooltip,
	                                                                 pill = true,
	                                                                 animated = false,
	                                                                 disabled = false,
	                                                                 loading = false,
	                                                                 className = '',
                                                                 }) => {
	const daisyClass = `btn ${size} ${type} ${severity}`;
	
	return (
		<div className={`${tooltip ? 'tooltip tooltip-secondary tooltip-bottom' : ''}`}
		     data-tip={tooltip}>
			
			<AtomSimpleMotionContainer
				enableHoverEffect={!disabled}
				hoverScale={!label ? HoverScale.LARGE : HoverScale.MEDIUM}>
				<button
					className={`btn ${label && pill ? 'md:px-6' :
                            label && !pill ? 'md:px-2' : 'btn-circle'}
                                ${pill ? 'rounded-full' : 'rounded-lg'}
                                ${daisyClass}
                                ${className}`}
					onClick={(event) => {
						event.stopPropagation();
						if (!loading && !disabled && onClick) {
							onClick();
						}
					}}
					disabled={disabled}
				>
					{loading && <div className="spinner spinner-primary"/>}
					{icon && <i className={`${icon} ${animated ? 'animate-pulse' : ''}`}/>}
					{label &&
                        <span className=
							      {`hidden sm:inline ml-auto
                                  ${animated ? 'animate-pulse' : ''}`}>
                            {label}
                        </span>
					}
				</button>
			</AtomSimpleMotionContainer>
		</div>
	);
});
export default AtomButton;
