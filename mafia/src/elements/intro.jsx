import React from 'react';
import mainPng from '../assets/main.png';

const IntroPage = () => {
    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex items-center"
            style={{
                backgroundImage: `url(${mainPng})`,
            }}
        >
            <div className="max-w-lg text-left bg-opacity-70 p-6 rounded-lg bg-black/50 ml-10">
                <h1 className="text-4xl font-bold text-white mb-4">Welcome to My Page</h1>
                <p className="text-lg text-gray-200 mb-6">
                    This is the introduction to your amazing website. Add a catchy tagline or a short description here!
                </p>
                <button className="btn btn-primary px-6 py-3 rounded-full">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default IntroPage;
