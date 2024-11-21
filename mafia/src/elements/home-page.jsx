
import React from 'react'
import NavBar from "./nav-bar";
import IntroPage from "./intro-page";
import CareerPage from "./career-page";
import BlogPage from "./blog-page";
import ToolsPage from "./tools-page";
import BlogContent from "../base/blog-content";

const HomePage = () => {
    return (
        <div className='flex-row gap-4'>
            <IntroPage/>
            <CareerPage/>
            <ToolsPage/>
            <BlogPage/>
            <BlogContent/>
        </div>
    )
}

export default HomePage