import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion } from "motion/react"
import {ButtonOptions} from "../utils/enums";

const PrimaryButton = ({
                           icon,
                           label,
                           onClick,
                           size = ButtonOptions.Size.Small,
                           state = ButtonOptions.State.None,
                           style = ButtonOptions.Style.Filled,
                           behavior = ButtonOptions.Behavior.Default,
                           isLoading = false,
                           className = '',
                       }) => {
    const padAndGap= size !== ButtonOptions.Size.Square ? 'px-4 py-1 gap-2' : ''
    const isIconSVG = icon && icon.endsWith('.svg');
    return (
        <motion.button
            className={`btn ${size} ${state} ${style} ${behavior} rounded-full items-center ${padAndGap} ${className}`}
            onClick={onClick}
            disabled={isLoading || state === ButtonOptions.State.Disabled} // Disable while loading
            aria-label={label || 'Button'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {/* Loading Spinner */}
            {isLoading && <span className="loading loading-spinner"></span>}

            {/* Icon */}
            {icon && !isLoading && isIconSVG && <img src={icon} alt="icon"></img>}

            {/* Icon */}
            {icon && !isLoading && !isIconSVG && <i className={icon}></i>}

            {/* Label */}
            {label && !isLoading && (
                <span className={icon ? 'hidden sm:inline' : ''}>{label}</span>
            )}
        </motion.button>
    );
};

export default PrimaryButton;
