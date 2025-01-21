
import {BlogInfo} from "../blog-info";
import Cover from "./formlabs-rd-cover.jpg";
import Logo from "./form-4-icon.svg"
import {BentoItemSize} from "../../../atoms/atom-bentobox";
import React from "react";
import {AtomPrimaryText} from "../../../atoms/atom-text";
import {AtomColumn, LayoutAlign} from "../../../atoms/atom-layout";
import AtomHeroGrid from "../../../atoms/atom-hero-grid";

const Achievements = () => {
	const contentList = [
		{
			icon: 'fas fa-square-plus',
			title: 'Novel Support Generation',
			size: BentoItemSize.Medium,
			summary: `Revamped the core product feature (3D-printing support generation) and pioneered a patent-pending truss optimization algorithm that significantly improved reliability, and achieved  a ~70% extra material reduction.`,
		},
		{
			icon: 'fas fa-infinity',
			title: 'Internal Tools',
			size: BentoItemSize.Medium,
			summary: `Developed and maintained internal website hosting computational, data-collection and analytical tools, allowing other teams to work more efficiently and provide a single source of truth for critical decisions.`,
		},
		{
			icon: 'fas fa-clock',
			title: 'Time Estimation',
			size: BentoItemSize.Medium,
			summary: `Reduced 3D print-time-estimation error by 10% and computation time by 75% through an approximate physics model.`,
		},
		{
			icon: 'fas fa-book',
			title: 'SLA Physics Book',
			size: BentoItemSize.Medium,
			summary: `Authored an internal-use book on computational physics modeling for the company's flagship products, detailing key aspects of the print process, underlying physics, parameter-driven behaviors, and optimization strategies.`,
		},
		{
			icon: 'fas fa-cogs',
			title: 'Settings Optimization',
			size: BentoItemSize.Large,
			summary: `Led cross-functional teams to optimize material settings for flagship products using advanced computational models and precision experiments, enhancing reliability and performance.`,
		},
	]
	return (
		<AtomColumn alignment={LayoutAlign.Start}>
			<AtomPrimaryText>
				Here are some of the key achievements during my time at Formlabs as an R&D Software Engineer:
			</AtomPrimaryText>
			<AtomHeroGrid contentList={contentList}/>
		</AtomColumn>
	)
}


class FormlabsRd extends BlogInfo {
	constructor() {
		super({
			id: 'formlabs-rd',
			title: 'R&D Software Engineer',
			description: 'Formlabs',
			date: 'Jan 2020',
			tags: ['C++', 'Optimization', 'Physics Modelling', 'Web Development', 'Process Engineer'],
			cover: Cover,
			isNew: false,
			logo: Logo,
			summary: `I was responsible for improving core product performance, making systems more reliable and efficient, and reducing resource waste. I worked on creating tools to help teams collaborate better and make data-driven decisions. My role also involved refining processes with advanced modeling and enhancing predictive accuracy to improve outcomes and overall user experience.`,
			sections: [
				{
					name: 'achievements',
					title: 'Achievements',
					children: <Achievements/>
				},
			],
		});
	}
}


export default FormlabsRd;