
import React from 'react'
import Intro from "./intro";
import Career from "./career";
import BlogListing from "./blogs";
import Tools from "./tools";
import BlogContent from "../base/blog-content";

const Home = () => {
    return (
        <div className='flex-row gap-4'>
            <Intro/>
            <Career/>
            <Tools/>
            <BlogListing/>
            <BlogContent/>
        </div>
    )
}

export default Home