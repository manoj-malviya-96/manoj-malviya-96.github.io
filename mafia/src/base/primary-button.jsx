import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {motion} from "motion/react"
import {ButtonOptions} from "../utils/enums";

const PrimaryButton = ({
                           icon,
                           label,
                           onClick,
                           size = ButtonOptions.Size.Small,
                           state = ButtonOptions.State.None,
                           style = ButtonOptions.Style.Primary,
                           behavior = ButtonOptions.Behavior.Default,
                           roundness = ButtonOptions.Round.Full,
                           hideWhenSmallDevice = true,
                           className = '',
                       }) => {

    // hover:border-neutral border-opacity-30 border-2

    const padAndGap = size !== ButtonOptions.Size.Square ? 'px-4 py-1 gap-2' : 'py-0 m-0'
    const isStaticIcon = icon && icon.endsWith('.svg');

    return (
        <motion.button
            className={`btn w-fit h-fit overflow-clip ${size} ${state} ${style} ${behavior} ${roundness} ${padAndGap} ${className}
                        border-white p-0 m-0 border-2`}
            onClick={onClick}
            disabled={state === ButtonOptions.State.Disabled} // Disable while loading
            aria-label={label || 'Button'}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
        >

            {/* Icon */}
            {!isStaticIcon && icon && <i className={icon}></i>}

            {/* Dynamic Icon */}
            {isStaticIcon && icon && <img src={icon} alt={label}/>}

            {/* Label */}
            {label && (
                <span className={icon && hideWhenSmallDevice ? 'hidden sm:inline' : 'uppercase'}>{label}</span>
            )}
        </motion.button>
    );
};

export default PrimaryButton;
