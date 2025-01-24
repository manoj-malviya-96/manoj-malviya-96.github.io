import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import React from "react";

interface ImageProviderProps {
  children: React.ReactNode;
}

const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  return <PhotoProvider>{children}</PhotoProvider>; //Todo add custom theme
};
export default ImageProvider;
