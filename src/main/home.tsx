import React, {useEffect} from 'react'
import Intro from "./intro";
import BlogListing from "./blog-list";
import AboutMe from "./about-me";
import BrandLogo from "./assets/logo.svg";
import ToolDrawer from "./tool-drawer";
import {useNavbar} from "../providers/navbar";


const Home = () => {
    const {updateBrand} = useNavbar();
    useEffect(() => {
        updateBrand({
            logo: BrandLogo,
            name: 'MAFIA'
        });
    }, [updateBrand]);
    
    return (
        <div className='flex-row w-full h-fit'>
            <Intro/>
            <AboutMe/>
            <ToolDrawer/>
            <BlogListing/>
        </div>
    )
}

export default Home