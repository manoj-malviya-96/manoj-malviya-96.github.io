import React from 'react';
import FullScreenPage from "../atoms/full-page";
import ProfilePicture from "./assets/main.jpg";

const Intro = () => {
    return (
        <FullScreenPage
            name="intro"
            backgroundImage={ProfilePicture}
            children={
                (
                    <div
                        className="absolute right-8 top-1/3 w-fit md:w-1/3 p-4">
                        <p className="text-lg mb-1 text-neutral">
                            Manoj's
                        </p>
                        <h1 className="text-4xl text-neutral font-bold mb-4 uppercase">
                            Audacious Factory Of Interactive Apps
                        </h1>
                    </div>
                )
            }
        />
    );
};

export default Intro;