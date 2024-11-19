import React from 'react';
import profilePicture from '../assets/main.jpg';
import PrimaryButton from "../base/button";
import { Element } from 'react-scroll';

const IntroPage = () => {
    return (
        <Element
            name="intro"
            className="h-screen w-screen bg-cover bg-center flex items-center"
            style={{
                backgroundImage: `url(${profilePicture})`,
            }}
        >
            <div className="max-w-lg text-left bg-opacity-70 p-6 rounded-lg">
                <h1 className="text-4xl font-bold text-white mb-4">Welcome to My Page</h1>
                <p className="text-lg text-gray-200 mb-6">
                    This is the introduction to your amazing website. Add a catchy tagline or a short description here!
                </p>
                <PrimaryButton label="Get Started" href="/apps"/>
            </div>
        </Element>
    );
};

export default IntroPage;
