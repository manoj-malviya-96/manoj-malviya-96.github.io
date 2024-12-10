import React, {useContext} from 'react';
import {Button} from 'primereact/button';
import MotionDiv from './motion-div';
import {ScreenSizeContext, ScreenSizes} from '../common/screen';

export interface AtomButtonProps {
    icon?: string;
    label?: string;
    onClick?: () => void;
    severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'contrast' | undefined;
    size?: 'small' | undefined | 'large';
    badge?: string;
    tooltip?: string;
    rounded?: boolean;
    outlined?: boolean;
    disabled?: boolean;
    raised?: boolean;
    ghost?: boolean;
    className?: string;
    loading?: boolean;
    neutralGhost?: boolean;
}

const _AtomButton: React.FC<AtomButtonProps> = ({
                                                    icon,
                                                    label,
                                                    onClick,
                                                    severity,
                                                    size,
                                                    badge,
                                                    tooltip,
                                                    rounded = true,
                                                    outlined = false,
                                                    disabled = false,
                                                    raised = false,
                                                    ghost = false,
                                                    loading = false,
                                                    neutralGhost = false,
                                                    className = '',
                                                }) => {
    const breakpoint = useContext(ScreenSizeContext);
    
    let daisyClass = ghost ? 'btn-ghost w-full' : 'btn-primary';
    if (neutralGhost) {
        daisyClass = 'bg-transparent text-neutral border-none ' +
                     'hover:bg-transparent hover:text-white disabled:text-neutral-50';
    }
    if (!outlined) {
        daisyClass += ' bg-opacity-70 backdrop-blur-xl border-none';
    }
    
    return (
        <MotionDiv enableHoverEffect={!ghost || !neutralGhost}>
            <Button
                className={`btn ${daisyClass} w-fit h-fit justify-center 
                            items-center px-5 py-0 m-0`}
                size={breakpoint !== ScreenSizes.Small ? size : 'large'}
                severity={severity}
                rounded={rounded}
                outlined={outlined}
                disabled={disabled}
                raised={raised}
                badge={badge}
                text={ghost}
                onClick={onClick}
                loading={loading}
                tooltip={tooltip ?? ''}
                tooltipOptions={{
                    showDelay: 300,
                    hideDelay: 100,
                    position: 'bottom',
                    style: {backgroundColor: 'rgba(0, 0, 0, 0.0)'},
                    mouseTrack: true,
                    mouseTrackTop: 15,
                }}
            >
                {/* Icons hack: Tailwind + PrimeReact messes up the padding, when only icon is used */}
                {icon && <i className={icon}/>}
                {label && <span
                    className="hidden sm:inline">{label}</span>}
            </Button>
        </MotionDiv>
    );
};


export const AtomButton = React.memo(_AtomButton);
