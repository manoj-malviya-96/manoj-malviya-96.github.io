import React from "react";
import { motion } from "framer-motion";

const slidingVariants = {
    initial: { y: "100vh", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100vh", opacity: 0 },
};

const SlidingAnimation = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slidingVariants}
            transition={{ type: "tween", duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default SlidingAnimation;
