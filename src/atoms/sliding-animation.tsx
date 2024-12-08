import React, {ReactNode} from "react";
import {motion, Variants} from "motion/react";

// Define the variants type explicitly for type safety
const slidingVariants: Variants = {
    initial: {x: "100vh"},
    animate: {x: 0},
    exit: {x: "-100vw"}
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
            transition={{duration: 0.21}}
        >
            {children}
        </motion.div>
    );
};

export default SlidingAnimation;
