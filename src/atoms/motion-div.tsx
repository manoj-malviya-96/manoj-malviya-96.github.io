import {motion} from "motion/react";
import React from "react";

interface MotionDivProps {
    children: React.ReactNode;
}

const MotionDiv: React.FC<MotionDivProps> = ({children}) => {
    return (
        <motion.div
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
        >
            {children}
        </motion.div>
    );
};

export default MotionDiv;