import { motion } from "motion/react";
import React from "react";

export enum HoverScale {
  NONE = 1,
  NOMINAL = 1.03,
  BIG = 1.3,
}

interface MotionDivProps {
  children: React.ReactNode;
  enableHoverEffect?: boolean;
  enableTapEffect?: boolean;
  hoverScale?: HoverScale;
}

const AtomSimpleMotionContainer: React.FC<MotionDivProps> = ({
  children,
  enableHoverEffect = true,
  enableTapEffect = true,
  hoverScale = HoverScale.NOMINAL,
}) => {
  return (
    <motion.div
      whileHover={{ scale: enableHoverEffect ? hoverScale : HoverScale.NONE }}
      whileTap={{ scale: enableTapEffect ? 0.9 : 1 }}
    >
      {children}
    </motion.div>
  );
};

export default AtomSimpleMotionContainer;
