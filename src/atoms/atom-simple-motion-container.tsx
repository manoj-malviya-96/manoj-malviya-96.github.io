import {motion} from "motion/react";
import React from "react";

interface MotionDivProps {
    children: React.ReactNode;
    enableHoverEffect?: boolean;
    enableTapEffect?: boolean;
}

const _AtomSimpleMotionContainer: React.FC<MotionDivProps> = ({
                                                                  children,
                                                                  enableHoverEffect = true,
                                                                  enableTapEffect = true
                                                              }) => {
    return (
        <motion.div
            whileHover={{scale: enableHoverEffect ? 1.05 : 1}}
            whileTap={{scale: enableTapEffect ? 0.9 : 1}}
        >
            {children}
        </motion.div>
    );
};

const AtomSimpleMotionContainer = React.memo(_AtomSimpleMotionContainer);
export default AtomSimpleMotionContainer;