import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import React from "react";

interface ImageProviderProps {
  children: React.ReactNode;
}

const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  return (
    <PhotoProvider
      bannerVisible={false}
      overlayRender={() => (
        <div className="absolute bottom-4 left-4 text-white text-sm">
          Click outside to close
        </div>
      )}
    >
      {children}
    </PhotoProvider>
  );
};
export default ImageProvider;
