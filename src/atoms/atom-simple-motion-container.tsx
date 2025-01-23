import { motion } from "motion/react";
import React from "react";

export enum HoverScale {
  NONE = 1,
  SMALL = 1.05,
  MEDIUM = 1.1,
  LARGE = 1.3,
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
  hoverScale = HoverScale.SMALL,
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
