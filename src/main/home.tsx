import React, {useEffect} from 'react'
import Intro from "./intro";
import BlogListing from "./blog-list";
import AboutMe from "./about-me";
import BrandLogo from "./assets/logo.svg";
import ToolDrawer from "./tool-drawer";
import {useNavbar} from "../providers/navbar";
import {AtomLinkBar} from "../atoms/atom-bars";
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
		<div className={'w-full h-full'}>
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
			<AtomLinkBar items={tabs} className={'fixed bottom-4 left-1/2 -translate-x-1/2 h-fit z-20'}/>
		</div>
	)
}

export default Home