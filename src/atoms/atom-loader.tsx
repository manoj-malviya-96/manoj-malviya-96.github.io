import React from "react";

interface AtomLoaderProps {
  className?: string;
}

export const AtomLoader: React.FC<AtomLoaderProps> = ({ className }) => {
  return <span className={`loading loading-ring p-16 ${className}`}></span>;
};
