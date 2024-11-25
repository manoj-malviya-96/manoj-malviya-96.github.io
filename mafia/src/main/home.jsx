import React from 'react'
import Intro from "./intro";
import Career from "./career";
import BlogListing from "./blogs";
import Tools from "./tools";
import TabBar from "../base/tab-bar";
import {createTabItem} from "../utils/types";

const Home = () => {
    const tabs = [
        createTabItem({name: 'intro', label: 'Intro', icon: 'fas fa-info-circle'}),
        createTabItem({name: 'tools', label: 'Tools', icon: 'fas fa-tools'}),
        createTabItem({name: 'blog', label: 'Blog', icon: 'fas fa-blog'}),
        createTabItem({name: 'career', label: 'About Me', icon: 'fas fa-person'}),
    ]
    return (
        <div className='flex-row w-fit h-fit'>
            <Intro/>
            <Tools/>
            <BlogListing/>
            <Career/>
            {/*match the top margin of the navbar*/}
            <div className='flex-column bg-base-100 bg-opacity-50 backdrop-blur-md m-4
                            rounded-2xl fixed top-0 w-fit h-fit z-20'>
                <TabBar tabs={tabs}/>
            </div>
        </div>
    )
}

export default Home