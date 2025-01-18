import React from 'react';
import AtomSimpleMotionContainer, {HoverScale} from './atom-simple-motion-container';
import {AtomPrimaryText} from "./atom-text";

export enum ButtonSize {
	ExtraSmall = 'btn-xs',
	Small = 'btn-sm text-xs',
	Medium = 'text-md',
	Large = 'btn-lg text-lg',
	ExtraLarge = 'btn-lg text-2xl',
}

export enum ButtonSeverity {
	Primary = `btn-primary hover:btn-secondary active:btn-secondary bg-opacity-50 hover:bg-opacity-100 backdrop-blur-lg `,
	Success = 'btn-success border-none bg-opacity-100',
	Info = 'btn-info border-none bg-opacity-100',
	Warning = 'btn-warning border-none bg-opacity-100',
	Error = 'btn-error border-none bg-opacity-100',
}

export enum ButtonType {
	Outlined = 'border border-secondary border-opacity-50 bg-opacity-0 hover:bg-opacity-100',
	Ghost = `bg-transparent border-none hover:bg-transparent hover:text-secondary
            hover:border-none hover:font-bold active:bg-transparent p-0`,
	Solid = 'shadow-none border-secondary border-opacity-10',
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
	hoverEffect?: boolean;
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
	                                                                 hoverEffect=true,
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
				enableHoverEffect={!disabled && hoverEffect}
				hoverScale={!label ? HoverScale.LARGE : HoverScale.MEDIUM}>
				<button
					className={`btn  ${label && pill ? 'md:px-6' :
						label && !pill ? 'md:px-2' : 'btn-circle'}
                                ${pill ? 'rounded-full' : 'rounded-lg'}
                                ${daisyClass}
                                shadow-none ${className}`}
					onClick={onClick}
					disabled={disabled}
				>
					{loading && <div className="spinner spinner-primary"/>}
					{icon && <i className={`${icon} ${animated ? 'animate-pulse' : ''}`}/>}
					{label &&
                        <AtomPrimaryText className=
							                 {`hidden sm:inline ml-auto
                                  ${animated ? 'animate-pulse' : ''}`}>
							{label}
                        </AtomPrimaryText>
					}
				</button>
			</AtomSimpleMotionContainer>
		</div>
	);
});
export default AtomButton;
