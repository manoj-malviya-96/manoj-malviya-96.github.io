import React from 'react'
import Intro from "./intro";


const Home = () => {
    // const tabs = [
    //     // createTabItem({name: 'intro', label: 'Intro', icon: ''}),
    //     createTabItem({name: 'tools', label: 'ToolList', icon: 'bi bi-app-indicator'}),
    //     createTabItem({name: 'blog', label: 'Blogs', icon: 'fas fa-bars-staggered'}),
    //     createTabItem({name: 'about-me', label: 'About Me', icon: 'fas fa-person-through-window'}),
    // ]
    return (
        <div className='flex-row w-full h-fit'>
            <Intro/>
            {/*<ToolList/>*/}
            {/*<BlogListing/>*/}
            {/*<AboutMe/>*/}
            {/*<TopTabBar tabs={tabs}/>*/}
        </div>
    )
}

export default Home