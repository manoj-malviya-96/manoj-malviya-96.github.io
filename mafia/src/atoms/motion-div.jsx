import {motion} from "motion/react";
const MotionDiv = ({children, className}) => {
    return (
        <motion.div
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.95}}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    )
}
export default MotionDiv;