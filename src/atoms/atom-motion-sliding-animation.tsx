import React, {ReactNode, useEffect} from "react";
import {motion} from "motion/react";

interface SlidingAnimationProps {
    children: ReactNode; // ReactNode covers all valid JSX children
}

const _AtomMotionSlidingAnimation: React.FC<SlidingAnimationProps> = ({children}) => {
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

const AtomMotionSlidingAnimation = React.memo(_AtomMotionSlidingAnimation);
export default AtomMotionSlidingAnimation;
