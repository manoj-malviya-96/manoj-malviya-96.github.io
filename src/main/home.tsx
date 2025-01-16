import React, {useEffect} from 'react'
import Intro from "./intro";
import BlogListing from "./blog-list";
import AboutMe from "./about-me";
import BrandLogo from "./assets/logo.svg";
import ToolDrawer from "./tool-drawer";
import {useNavbar} from "../providers/navbar";
import {AtomLinkBarRow} from "../atoms/atom-tab-bar";
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";


const Home = () => {
	const {updateBrand} = useNavbar();
	useEffect(() => {
		updateBrand({
			logo: BrandLogo,
			name: 'MANOJ'
		});
	}, [updateBrand]);
	
	const tabs = [
		{name: 'about-me', label: 'About Me', icon: 'fa-solid fa-user'},
		{name: 'playground', label: 'Playground', icon: 'fa-solid fa-tools'},
		{name: 'blog', label: 'Blog', icon: 'fa-solid fa-blog'},
	];
	
	return (
		<>
			<Intro/>
			<div className={'flex flex-col w-full h-full'}>
				<AtomLinkBarRow items={tabs} className={'sticky mt-8 top-4 left-1/2 -translate-x-1/2 h-fit z-20'}/>
				<AtomFullScreenContainer name={'about-me'}>
					<AboutMe/>
				</AtomFullScreenContainer>
				<AtomFullScreenContainer name={'playground'}>
					<ToolDrawer/>
				</AtomFullScreenContainer>
				<AtomFullScreenContainer name={'blog'}>
					<BlogListing/>
				</AtomFullScreenContainer>
			</div>
		</>
	)
}

export default Home