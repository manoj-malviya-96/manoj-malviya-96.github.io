import {BlogInfo} from "../blog-info";
import Cover from "./penn-state-cover.jpg";
import Logo from "./pennstate-logo.svg";
import {BentoItemSize} from "../../../atoms/atom-bentobox";
import React from "react";
import {AtomPrimaryText} from "../../../atoms/atom-text";
import {AtomColumn} from "../../../atoms/atom-layout";
import AtomHeroGrid from "../../../atoms/atom-hero-grid";


const Achievements = () => {
	const contentList = [
		{
			icon: 'fas fa-trophy',
			title: 'Design Automation',
			size: BentoItemSize.Medium,
			summary: `Developed novel 3D graphics algorithms to automate design processes for embedding in additive manufacturing, resulting in published research in top mechanical design journals`,
			link: {
				children: 'Journal',
				url: 'https://asmedigitalcollection.asme.org/mechanicaldesign/article-abstract/142/11/114501/1082606/Digital-Design-Automation-to-Support-In-Situ?redirectedFrom=fulltext'
			}
		},
		{
			icon: 'fas fa-brain',
			title: 'Engineering Design',
			size: BentoItemSize.Medium,
			summary: `Engineered data analysis tools and interactive design experiments, using eye-tracking technology and probabilistic models to improve user insights on engineering design processes`,
			link: {
				children: 'Journal',
				url: 'https://asmedigitalcollection.asme.org/mechanicaldesign/article-abstract/142/12/124502/1086965/Mining-Design-Heuristics-for-Additive?redirectedFrom=fulltext'
			}
		},
		{
			title: 'Qualitative Methods',
			icon: 'fas fa-cogs',
			size: BentoItemSize.Medium,
			summary: `Pioneered novel qualitative data analysis methods and tools.`,
			link: {
				url: 'https://journals.sagepub.com/doi/full/10.1177/16094069211002418',
				children: 'Inter Coder Reliability'
			}
		},
		{
			title: 'Research Collaboration',
			icon: 'fas fa-users',
			size: BentoItemSize.Medium,
			summary: `Coauthored 8 peer-reviewed publications & presented research at scientific seminars, international conferences, weekly meetings and classes.`
		},
		{
			title: 'Thesis',
			icon: 'fas fa-book',
			size: BentoItemSize.Large,
			summary: `Applied machine learning to analyze and characterize implicit cognitive processes in engineering design across diverse contexts`,
			link: {
				children: 'Thesis',
				url: 'https://etda.libraries.psu.edu/catalog/18179mxm2429'
			}
		}
	];
	return (
		<AtomColumn>
			<AtomPrimaryText>
				Here are some of the key achievements during my time at Penn State as a Graduate Researcher:
			</AtomPrimaryText>
			<AtomHeroGrid contentList={contentList}/>
		</AtomColumn>
	)
}

class PennStateRD extends BlogInfo {
	constructor() {
		super({
			id: 'pennstate-rd',
			title: 'Graduate Researcher',
			description: 'Penn State University',
			date: 'Aug 2018',
			tags: ['Python', 'Optimization', 'Statistics', 'Machine Learning', '3D Graphics'],
			cover: Cover,
			isNew: false,
			logo: Logo,
			summary: `I designed cutting-edge 3D graphics algorithms and automated design processes for additive manufacturing—because why not overachieve? Ended up publishing in top journals and presenting my work to over 100 people (yes, I overdid it). I also engineered data analysis tools and interactive experiments to make engineering design smarter and more intuitive. Oh, and coauthored 8 peer-reviewed papers while pioneering novel qualitative data methods—because sleep is overrated.`,
			sections: [
				{
					name: 'achievements',
					title: 'Achievements',
					children: <Achievements/>
				}
			],
		});
	}
}

const pennStateRDInstance = new PennStateRD();
export default pennStateRDInstance;