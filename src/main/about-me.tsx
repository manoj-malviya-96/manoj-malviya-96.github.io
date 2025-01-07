import React from 'react';
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import GithubProfile from "./github";
import {jobRelatedBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/math";
import {openLink} from "../common/links";
import {AtomButton, AtomButtonProps, ButtonSize, ButtonType} from "../atoms/atom-button";
import AtomStyledContainer from "../atoms/atom-styled-container";
import {useNavigate} from "react-router-dom";
import AtomTimeline from "../atoms/atom-timeline";
import {
	AtomHeroBrandTitleText,
	AtomPrimaryBadge, AtomPrimaryText,
} from "../atoms/atom-text";
import {AtomColumn, AtomGrid, AtomLayoutAlignment, AtomLayoutGap, AtomLayoutSize, AtomRow} from "../atoms/atom-layout";

type SocialMediaLink = [icon: string, link: string, tooltip: string];
const MySocialMediaLinks: Array<SocialMediaLink> = [
	[
		'fa-brands fa-linkedin',
		'https://www.linkedin.com/in/manoj-malviya-44700aa4/',
		'linkedin'
	],
	[
		'fa-brands fa-github',
		'https://github.com/manoj-malviya-96',
		'github'
	],
	[
		'fa-brands fa-google',
		'https://scholar.google.com/citations?user=0oMXOy0AAAAJ&hl=en&authuser=2',
		'google scholar'
	],
	[
		'fa-brands fa-instagram',
		'https://www.instagram.com/manoj_malviya_/',
		'instagram'
	],
	[
		'fa-brands fa-youtube',
		'https://www.youtube.com/@manoj_malviya_',
		'youtube'
	],
	[
		'fa-brands fa-apple',
		'https://music.apple.com/us/artist/manoj-malviya/1721435458',
		'apple music'
	],
];
const SocialMediaButtons = () => {
	const socialMediaItems = rangesTo(
		MySocialMediaLinks, (smLink: SocialMediaLink) => {
			return {
				icon: smLink[0],
				type: ButtonType.Ghost,
				size: ButtonSize.Large,
				onClick: () => openLink(smLink[1], null),
				tooltip: smLink[2],
			} as AtomButtonProps;
		});
	return (
		<AtomStyledContainer label={'Find me here'} hug={true}>
			{socialMediaItems.map((item, index) => (
				<AtomButton
					key={index}
					{...item}
				/>
			))}
		</AtomStyledContainer>
	)
}


const AboutMeParagraph = () => {
	return (
		<AtomStyledContainer
			label={'About Me'}
		>
			<AtomPrimaryText
				className={'w-full p-0 justify-start'}
			>
				Designed for elegance, engineered for impact.
				Manoj combines cutting-edge innovation with user-first
				thinking to deliver simple yet creative solutions. <br/>
				Complex challenges? Consider them solved with
				precision and artistry.
			</AtomPrimaryText>
		</AtomStyledContainer>
	)
}

const CareerHighlights = () => {
	const navigate = useNavigate();
	const timelineData = rangesTo(jobRelatedBlogs, (blog) => {
		return {
			title: blog.title,
			date: blog.date,
			icon: blog.logo,
			description: blog.description,
			onClick: () => navigate(blog.path),
		};
	});
	return (
		<AtomStyledContainer
			label={'Career Highlights'}>
			<AtomTimeline items={timelineData} className={'h-fit p-0'}/>
		</AtomStyledContainer>
	)
}


const Skills = () => {
	const skills = [
		`C++`,
		`Python`,
		`JavaScript`,
		`TypeScript`,
		`React`,
		`Node.js`,
		`Express.js`,
		`Docker`,
		`AWS`,
		`MATLAB`,
		`AI`,
		`Optimization`,
		`Modelling`,
		`3D Graphics`
	]
	
	return (
		<AtomStyledContainer
			label={'Skills'}
			className={'w-full'}>
			<AtomGrid>
				{skills.map(
					(skill, index) => (
						<AtomPrimaryBadge key={index} className={'w-fit'}>{skill}</AtomPrimaryBadge>
					))
				}
			</AtomGrid>
		</AtomStyledContainer>
	)
}

const HeroTextAboutMe = () => {
	return (
		<AtomColumn size={AtomLayoutSize.FullWidth} gap={AtomLayoutGap.None}>
			<AtomHeroBrandTitleText
				className={'w-full'}>Lets Unbox Me.</AtomHeroBrandTitleText>
			<AtomPrimaryText className={'w-full'}>
				The Next Gen Problem Solving Engine
			</AtomPrimaryText>
		</AtomColumn>
	);
}


const AboutMe = () => {
	return (
		<AtomFullScreenContainer
			name="about-me"
			children={
				<AtomRow
					size={AtomLayoutSize.FullSize}
					alignment={AtomLayoutAlignment.Start}>
					
					<AtomColumn
						className={'w-full md:w-1/2'}
						alignment={AtomLayoutAlignment.VStart}
						size={AtomLayoutSize.None}>
						<HeroTextAboutMe/>
						<AboutMeParagraph/>
						<Skills/>
						<SocialMediaButtons/>
					</AtomColumn>
					
					<AtomColumn
						alignment={AtomLayoutAlignment.VStart}
						size={AtomLayoutSize.FullWidth}>
						<CareerHighlights/>
						<AtomStyledContainer
							label={'Github Profile'}
							className="w-full">
							<GithubProfile/>
						</AtomStyledContainer>
					</AtomColumn>
				</AtomRow>
			}
		/>
	);
};

export default AboutMe;
