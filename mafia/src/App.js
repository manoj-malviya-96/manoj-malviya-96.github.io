import React from 'react';
import PrimaryButton from "./base/button";
import { FaArrowRight } from 'react-icons/fa'; // Example icon from react-icons

const App = () => {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div className="p-4">
            <PrimaryButton
                icon={<FaArrowRight />}
                label="Get Started"
                onClick={handleClick}
            />
        </div>
    );
};

export default App;
