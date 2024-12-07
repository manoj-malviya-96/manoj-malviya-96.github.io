import {PhotoProvider, PhotoView} from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const PhotoViz = ({src, alt, className=''}) => {
    return (
        <PhotoProvider>
            <PhotoView src={src}>
                <div className={`flex flex-col justify-center items-center ${className}`}>
                    <img
                        src={src}
                        alt={alt}
                        className="rounded-lg cursor-pointer w-full h-full"
                    />
                    <span className='text-primary fw-bold text-sm mt-2 w-full'>{alt}</span>
                </div>
            </PhotoView>
        </PhotoProvider>
    );
};

export default PhotoViz;
