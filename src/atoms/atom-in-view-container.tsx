import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

interface AtomInViewContainerProps {
  children?: React.ReactNode;
  onInView?: () => void;
}

const AtomInViewContainer: React.FC<AtomInViewContainerProps> = ({
  children,
  onInView,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when in view
    threshold: 0.18, // Trigger when 10% of the element is visible
  });

  useEffect(() => {
    if (inView && onInView) {
      onInView();
    }
  }, [inView, onInView]);

  return <div ref={ref}>{children}</div>;
};

export default AtomInViewContainer;
