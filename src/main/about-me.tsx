import React from 'react';
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import GithubProfile from "./github";
import {jobRelatedBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/math";
import {openLink} from "../common/links";
import {AtomButtonProps, ButtonSize, ButtonType} from "../atoms/atom-button";
import AtomGroup, {AtomButtonGroup, AtomGroupLayout} from "../atoms/atom-group";
import {useNavigate} from "react-router-dom";
import AtomTimeline from "../atoms/atom-timeline";
import {AtomPrimaryBadge, AtomHeroTitleText, AtomSecondaryParagraph, AtomSecondaryBadge} from "../atoms/atom-text";
import {AtomColumn, AtomLayoutAlignment, AtomLayoutSize, AtomRow} from "../atoms/atom-layout";

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
		<AtomButtonGroup className={'w-full'}
		                 items={socialMediaItems}
		                 label={'Find me here'}/>
	)
}


const AboutMeParagraph = () => {
	return (
		<AtomGroup
			label={'About Me'}
			layout={AtomGroupLayout.Vertical}
			className={'w-full'}
		>
			<AtomHeroTitleText text={'The Next Gen Problem Solving Engine'}/>
			<AtomSecondaryParagraph
				texts={
					[
						`Designed for elegance, engineered for impact.
                                        Manoj combines cutting-edge innovation with user-first
                                        thinking to deliver simple yet creative solutions.
                                        `, `Complex challenges? Consider them solved with
                                        precision and artistry.`
					]
				}
				className={'w-full p-0 justify-start'}
			/>
		</AtomGroup>
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
		<AtomGroup
			label={'Career Highlights'}
			layout={AtomGroupLayout.Horizontal}
			className="w-full h-fit">
			<AtomTimeline items={timelineData}/>
		</AtomGroup>
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
		<AtomGroup
			label={'Skills'}
			className={'w-full'}
			layout={AtomGroupLayout.Grid3}>
			{skills.map(
				(skill, index) => (
					<AtomPrimaryBadge key={index} text={skill} className={'w-fit'}/>
				))
			}
		</AtomGroup>
	)
}


const AboutMe = () => {
	return (
		<AtomFullScreenContainer
			name="about-me"
			title={'Lets unbox me.'}
			children={
				<AtomRow
					size={AtomLayoutSize.FullSize}
					alignment={AtomLayoutAlignment.VStart}>
					
					<AtomColumn
						className={'w-1/2'}
						alignment={AtomLayoutAlignment.Center}
						size={AtomLayoutSize.None}>
						<AboutMeParagraph/>
						<Skills/>
						<SocialMediaButtons/>
					</AtomColumn>
					
					<AtomColumn
						alignment={AtomLayoutAlignment.VStart}
						size={AtomLayoutSize.FullWidth}>
						<CareerHighlights/>
						<AtomGroup
							label={'Github Profile'}
							className="w-full">
							<GithubProfile/>
						</AtomGroup>
					</AtomColumn>
				</AtomRow>
			}
		/>
	);
};

export default AboutMe;
