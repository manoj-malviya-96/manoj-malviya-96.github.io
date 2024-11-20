
import React from 'react'
import NavBar from "./nav-bar";
import IntroPage from "./intro-page";
import CareerPage from "./career-page";
import BlogPage from "./blog-page";
import ToolsPage from "./tools-page";

const HomePage = () => {
    return (
        <div className='flex-row gap-4'>
            <NavBar/>
            <IntroPage/>
            <CareerPage/>
            <ToolsPage/>
            <BlogPage/>
        </div>
    )
}

export default HomePage