import React from 'react';
import PrimaryButton from "./base/button";
import { FaArrowRight } from 'react-icons/fa';
import ThemeManager from "./elements/theme";
import Navbar from "./elements/navbar";
import IntroPage from "./elements/intro"; // Example icon from react-icons

const App = () => {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div className="p-4">
            <Navbar />
            <IntroPage />
        </div>
    );
};

export default App;
