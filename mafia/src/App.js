import React from 'react';
import NavBar from "./elements/nav-bar";
import IntroPage from "./elements/intro-page";
import CareerPage from "./elements/career-page";
import BlogPage from "./elements/blog-page";

const App = () => {
    return (
        <div className='flex-row gap-4'>
            <NavBar />
            <IntroPage />
            <CareerPage />
            <BlogPage />
        </div>
    );
};

export default App;
