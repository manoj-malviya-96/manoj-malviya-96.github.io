import React, {useContext} from 'react';
import {Button} from 'primereact/button';
import MotionDiv from "./motion-div";
import {ScreenSizeContext, ScreenSizes} from "../utils/screen";

const AtomButton = ({
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
                        className = '',
                    }) => {
    const breakpoint = useContext(ScreenSizeContext);
    const daisyClass = ghostMode ? 'btn-ghost' : 'btn-primary'
    return (
        <MotionDiv className={className}>
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
                tooltip={tooltip ? tooltip : ''}
                tooltipOptions={{
                    showDelay: 300,
                    hideDelay: 100,
                    position: 'bottom',
                    style: {backgroundColor: 'rgba(0, 0, 0, 0.0)'},
                    mouseTrack: true,
                    mouseTrackTop: 15
                }}
            >
                {/*Icons hack: Tailwind + Prime React messes up the padding, when only icon is used. This centers icon*/}
                {icon && <i className={icon}/>}
                {label && <span>{label}</span>}
            </Button>
        </MotionDiv>
    );
};


export default AtomButton;
