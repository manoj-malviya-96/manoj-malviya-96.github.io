import React from "react";
import { motion } from "framer-motion";

const slidingVariants = {
    initial: { x: "100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
};

const SlidingAnimation = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slidingVariants}
            transition={{ type: "tween", duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

export default SlidingAnimation;
