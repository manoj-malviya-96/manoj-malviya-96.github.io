import React from 'react';
import Navbar from "./elements/navbar";
import IntroPage from "./elements/intro";
import CareerPage from "./elements/career";
import BlogPage from "./elements/blogs";
import BentoBox from "./base/bentobox"; // Example icon from react-icons

const App = () => {
    return (
        <div className='flex-row gap-4'>
            <Navbar />
            <IntroPage />
            <CareerPage />
            <BentoBox/>
        </div>
    );
};

export default App;
