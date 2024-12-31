import React, {ReactNode, useEffect} from "react";
import {motion} from "motion/react";

interface SlidingAnimationProps {
    children: ReactNode;
}

const AtomMotionSlidingAnimation: React.FC<SlidingAnimationProps> = ({children}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
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

export default AtomMotionSlidingAnimation;
