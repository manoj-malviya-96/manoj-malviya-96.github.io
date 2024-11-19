import React from 'react';
import Navbar from "./elements/navbar";
import IntroPage from "./elements/intro";
import CareerPage from "./elements/career"; // Example icon from react-icons

const App = () => {
    return (
        <div className="p-4">
            <Navbar />
            <IntroPage />
            <CareerPage />
        </div>
    );
};

export default App;
