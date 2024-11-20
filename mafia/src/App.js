import React from 'react';
import Navbar from "./elements/navbar";
import IntroPage from "./elements/intro";
import CareerPage from "./elements/career";
import BlogPage from "./elements/blogs";

const App = () => {
    return (
        <div className='flex-row gap-4'>
            <Navbar />
            <IntroPage />
            <CareerPage />
            <BlogPage />
        </div>
    );
};

export default App;
