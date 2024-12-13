import React from 'react';
import FullScreenPage from "../atoms/full-page";
import ProfilePicture from "./assets/main.jpg";
import {Button} from "primereact/button";
import {AtomButton} from "../atoms/atom-button";

const Intro = () => {
    return (
        <FullScreenPage
            name="intro"
            backgroundImage={ProfilePicture}
            children={
                (
                    <>
                        <div
                            className="absolute left-8 top-1/3 w-fit md:w-1/3 p-4">
                            <p className="text-lg mb-1 text-black">
                                Manoj's
                            </p>
                            <h1 className="text-4xl text-black font-bold mb-4 uppercase">
                                Audacious Factory Of Interactive Apps
                            </h1>
                        </div>
                        <div className="absolute bottom-8 left-1/2">
                            <AtomButton
                                icon="pi pi-arrow-down"
                                animated={true}
                                onClick={() => {
                                    document.getElementById("about")?.scrollIntoView({behavior: "smooth"});
                                }}
                            />
                        </div>
                    </>
                )
            }
        />
    );
};

export default Intro;
