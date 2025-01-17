import React, {useEffect} from 'react'
import Intro from "./intro";
import BlogListing from "./blog-list";
import AboutMe from "./about-me";
import BrandLogo from "./assets/logo.svg";
import ToolDrawer from "./tool-drawer";
import {useNavbar} from "../providers/navbar";
import {AtomLinkBarRow} from "../atoms/atom-tab-bar";
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import {AtomPrimaryText} from "../atoms/atom-text";


const Home = () => {
	const {updateBrand} = useNavbar();
	useEffect(() => {
		updateBrand({
			logo: BrandLogo,
			name: 'MANOJ'
		});
	}, [updateBrand]);
	
	const tabs = [
		{name: 'about-me', children: <AtomPrimaryText>About Me</AtomPrimaryText>},
		{name: 'playground', children: <AtomPrimaryText>Tools</AtomPrimaryText>},
		{name: 'blog', children: <AtomPrimaryText>Blog</AtomPrimaryText>},
	];
	
	return (
		<>
			<AtomLinkBarRow items={tabs} className={'sticky top-4 left-1/2 -translate-x-1/2 h-fit z-20'}/>
			<Intro/>
			<div className={'flex flex-col w-full h-full'}>
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