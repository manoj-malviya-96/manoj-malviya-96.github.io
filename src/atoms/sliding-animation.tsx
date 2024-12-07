import React, {ReactNode} from "react";
import {motion, Variants} from "motion/react";

// Define the variants type explicitly for type safety
const slidingVariants: Variants = {
    initial: {y: "100vh", opacity: 0},
    animate: {y: 0, opacity: 1},
    exit: {y: "-100vh", opacity: 0},
};

// Define props interface
interface SlidingAnimationProps {
    children: ReactNode; // ReactNode covers all valid JSX children
}

const SlidingAnimation: React.FC<SlidingAnimationProps> = ({children}) => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slidingVariants}
            transition={{duration: 0.3}}
        >
            {children}
        </motion.div>
    );
};

export default SlidingAnimation;
