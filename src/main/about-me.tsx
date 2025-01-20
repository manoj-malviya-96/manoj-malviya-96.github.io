import React from 'react';
import {jobRelatedBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/math";
import {openLink} from "../common/links";
import {AtomButton, AtomButtonProps, ButtonSize, ButtonType} from "../atoms/atom-button";
import AtomStyledContainer from "../atoms/atom-styled-container";
import {useNavigate} from "react-router-dom";
import AtomTimeline from "../atoms/atom-timeline";
import {AtomHeroBrandTitleText, AtomPrimaryText,} from "../atoms/atom-text";
import {
	AtomColumn,
	AtomColumnDivider,
	AtomLayoutAlignment,
	AtomLayoutGap,
	AtomLayoutSize,
	AtomRow,
} from "../atoms/atom-layout";
import AtomImage from "../atoms/atom-image";
import ProfilePicture from "./assets/main.jpg";
import {GithubCalendar} from "./github";

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
		<AtomStyledContainer label={'Find me here'} hug={true} className={'w-full'} transparency={true}>
			{socialMediaItems.map((item, index) => (
				<AtomButton
					key={index}
					{...item}
				/>
			))}
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
		<AtomTimeline items={timelineData} className={'w-full h-full'}/>
	)
}

const AboutMeText = () => {
	return (
		<AtomColumn gap={AtomLayoutGap.Small} size={AtomLayoutSize.None}>
			<AtomImage src={ProfilePicture} alt={'Cover'}/>
			<AtomHeroBrandTitleText className={'w-full'}>
				Manoj Malviya
			</AtomHeroBrandTitleText>
			<AtomPrimaryText
				className={'w-fit p-0 justify-start'}
			>
				Designed for elegance, engineered for impact.
				Manoj combines cutting-edge innovation with user-first
				thinking to deliver simple yet creative solutions. <br/>
				Complex challenges? Consider them solved with
				precision and artistry.
			</AtomPrimaryText>
		</AtomColumn>
	);
}


const AboutMe = () => {
	return (
		<AtomRow
			size={AtomLayoutSize.FullSize}
			alignment={AtomLayoutAlignment.Start}
			smallDeviceAdjustment={true}
			className={'mt-4'}>
			<AtomStyledContainer className={'w-full md:w-1/2 h-full'}>
				<AtomColumn size={AtomLayoutSize.FullWidth}>
					<AboutMeText/>
					<SocialMediaButtons/>
				</AtomColumn>
			</AtomStyledContainer>
			<AtomStyledContainer className={'w-full h-full'} transparency={true}>
				<AtomColumn size={AtomLayoutSize.FullSize}
				            gap={AtomLayoutGap.Small}>
					<CareerHighlights/>
					<AtomColumnDivider/>
					<GithubCalendar/>
				</AtomColumn>
			</AtomStyledContainer>
		</AtomRow>
	);
};

export default AboutMe;
