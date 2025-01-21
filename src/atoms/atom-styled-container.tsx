import React from "react";
import { AtomTertiaryText } from "./atom-text";

interface AtomStyledContainerProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
  hug?: boolean;
  transparency?: boolean;
}

const AtomStyledContainer: React.FC<AtomStyledContainerProps> = ({
  label,
  children,
  hug = false,
  transparency = true,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <AtomTertiaryText>{label}</AtomTertiaryText>}
      <div
        className={`inline-block ${hug ? "p-0 gap-0" : "p-4 gap-4"}
                        rounded-md hover:shadow
                        ${transparency ? "bg-transparent" : "bg-neutral bg-opacity-10 backdrop-blur-lg"}
                        border border-neutral border-opacity-40
                        backdrop-blur-lg`}
      >
        {children}
      </div>
    </div>
  );
};

export default AtomStyledContainer;
