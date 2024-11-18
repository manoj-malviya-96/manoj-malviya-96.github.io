import React from 'react';
import PrimaryButton from "./base/button";
import { FaArrowRight } from 'react-icons/fa';
import ThemeManager from "./widgets/theme";
import Navbar from "./widgets/navbar"; // Example icon from react-icons

const App = () => {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div className="p-4">
            <Navbar />
        </div>
    );
};

export default App;
