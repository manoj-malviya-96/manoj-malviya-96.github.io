import { ThreeDots } from "react-loader-spinner";
import React from "react";

interface AtomLoaderProps {
  height?: number;
  width?: number;
}

export const AtomLoader: React.FC<AtomLoaderProps> = ({ height, width }) => {
  return (
    <ThreeDots
      visible={true}
      height={height}
      width={width}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
