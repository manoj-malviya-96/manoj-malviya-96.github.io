import React, {ReactNode, useEffect} from "react";
import {motion, Variants} from "motion/react";

// Define props interface
interface SlidingAnimationProps {
    children: ReactNode; // ReactNode covers all valid JSX children
}

const SlidingAnimation: React.FC<SlidingAnimationProps> = ({children}) => {
    useEffect(() => {
        window.scrollTo(0, 0); // Ensure top scroll position
    }, []);
    
    return (
        <motion.div
            initial={{opacity: 0, y: '100vh'}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: '-100vh'}}
            transition={{duration: 0.21}}
        >
            {children}
        </motion.div>
    );
};

export default SlidingAnimation;
