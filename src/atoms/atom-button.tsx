import React from 'react';
import MotionDiv from './motion-div';

export enum ButtonSize {
    ExtraSmall = 'btn-xs',
    Small = 'btn-sm',
    Medium = '',
    Large = 'btn-lg',
}

export enum ButtonSeverity {
    Primary = 'btn-primary',
    Secondary = 'btn-secondary',
    Success = 'btn-success',
    Info = 'btn-info',
    Warning = 'btn-warning',
    Error = 'btn-error',
}

export enum ButtonType {
    Outlined = 'btn-outline',
    Ghost = `btn-ghost hover:bg-transparent
            hover:border-0 hover:font-bold active:bg-transparent`,
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
    rounded?: boolean;
    disabled?: boolean;
    loading?: boolean;
    animated?: boolean;
    className?: string;
}

const _AtomButton: React.FC<AtomButtonProps> = ({
                                                    icon,
                                                    label,
                                                    onClick,
                                                    severity = ButtonSeverity.Primary,
                                                    size = ButtonSize.Medium,
                                                    type = ButtonType.Solid,
                                                    tooltip,
                                                    disabled = false,
                                                    loading = false,
                                                    className = '',
                                                }) => {
    const daisyClass = `btn ${size} ${type} ${severity}`;
    
    return (
        <div className="tooltip tooltip-primary tooltip-bottom" data-tip={tooltip}>
            <MotionDiv enableHoverEffect={!disabled}>
                <button
                    className={`btn ${label ? 'md:px-4 rounded-full' : 'btn-circle'}
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
                    {icon && <i className={`${icon}`}/>}
                    {label && <span className="hidden sm:inline">{label}</span>}
                </button>
            </MotionDiv>
        </div>
    );
};

export const AtomButton = React.memo(_AtomButton);
