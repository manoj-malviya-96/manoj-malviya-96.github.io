import React, {useContext} from 'react';
import {Button} from 'primereact/button';
import MotionDiv from './motion-div';
import {ScreenSizeContext, ScreenSizes} from '../common/screen';

export interface AtomButtonProps {
    icon?: string;
    label?: string;
    onClick: () => void;
    severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'contrast' | undefined;
    size?: 'small' | undefined | 'large';
    badge?: string;
    tooltip?: string;
    rounded?: boolean;
    outlined?: boolean;
    disabled?: boolean;
    raised?: boolean;
    ghostMode?: boolean;
    className?: string;
    loading?: boolean;
}

export const AtomButton: React.FC<AtomButtonProps> = ({
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
                                                          ghostMode = false,
                                                          loading = false,
                                                          className = '',
                                                      }) => {
    const breakpoint = useContext(ScreenSizeContext);
    const daisyClass = ghostMode ? 'btn-ghost' : 'btn-primary';

    return (
        <MotionDiv>
            <Button
                className={`btn ${daisyClass} w-fit h-fit justify-center items-center`}
                size={breakpoint !== ScreenSizes.Small ? size : 'large'}
                severity={severity}
                rounded={rounded}
                outlined={outlined}
                disabled={disabled}
                raised={raised}
                badge={badge}
                text={ghostMode}
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
                {label && <span className="hidden sm:inline">{label}</span>}
            </Button>
        </MotionDiv>
    );
};
