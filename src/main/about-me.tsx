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
import {AtomBadge, AtomHeroTitleText, AtomSecondaryParagraph} from "../atoms/atom-text";
import {AtomColumn, AtomLayoutAlignment, AtomRow} from "../atoms/atom-layout";

type SocialMediaLink = [icon: string, link: string, tooltip: string];
const MySocialMediaLinks: Array<SocialMediaLink> = [
	['fa-brands fa-linkedin', 'https://www.linkedin.com/in/manoj-malviya-44700aa4/', 'linkedin'],
	['fa-brands fa-github', 'https://github.com/manoj-malviya-96', 'github'],
	[
		'fa-brands fa-google', 'https://scholar.google.com/citations?user=0oMXOy0AAAAJ&hl=en&authuser=2',
		'google scholar'
	],
	['fa-brands fa-instagram', 'https://www.instagram.com/manoj_malviya_/', 'instagram'],
	['fa-brands fa-youtube', 'https://www.youtube.com/@manoj_malviya_', 'youtube'],
	['fa-brands fa-apple', 'https://music.apple.com/us/artist/manoj-malviya/1721435458', 'apple music'],
];
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

const skills = [
	`C++`,
	`Python`,
	`JavaScript`,
	`TypeScript`,
	`React`,
	`Node.js`,
	`Express.js`,
	`MongoDB`,
	`PostgreSQL`,
	`Docker`,
	`Kubernetes`,
	`AWS`,
	`MATLAB`,
]

const AboutMe = () => {
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
		<AtomFullScreenContainer
			name="about-me"
			title={'Manoj Malviya'}
			children={
				<AtomColumn>
					<AtomRow>
						<AtomRow alignment={AtomLayoutAlignment.HStart}>
							<AtomGroup
								label={'About Me'}
								layout={AtomGroupLayout.Vertical}
								className={'w-1/3 h-fit'}
							>
								<AtomHeroTitleText text={'The Next-Gen Problem-Solving Engine'}/>
								<AtomSecondaryParagraph
									texts={
										[
											`Designed for elegance, engineered for impact.
                                        Manoj combines cutting-edge innovation with user-first
                                        thinking to deliver sleek, creative solutions.
                                        `, ` Complex challenges? Consider them solved with
                                        precision and artistry.`
										]
									}
									className={'w-fit text-left'}
								/>
							</AtomGroup>
							<AtomButtonGroup items={socialMediaItems}
							                 label={'Find me here'}/>
							<AtomGroup label={'Skills'} layout={AtomGroupLayout.Grid3}>
								{skills.map(
									(skill, index) => (
										<AtomBadge key={index} text={skill}/>
									))
								}
							</AtomGroup>
						</AtomRow>
					</AtomRow>
					<AtomRow alignment={AtomLayoutAlignment.Start}>
						<AtomGroup
							label={'Career Highlights'}
							layout={AtomGroupLayout.Vertical}
							className="w-fit md:w-1/2">
							<AtomTimeline items={timelineData}/>
						</AtomGroup>
						<AtomGroup
							label={'Github Profile'}
							className="w-full h-1/2">
							<GithubProfile/>
						</AtomGroup>
					</AtomRow>
				</AtomColumn>
			}
		/>
	);
};

export default AboutMe;
