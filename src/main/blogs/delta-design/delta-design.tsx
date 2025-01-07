import {BlogInfo, heatmapColorScale} from "../blog-info";
import Cover from "./cover.webp"
import IntroChart from './background.png';
import GameUI from './game-ui.png';
import {BentoItemSize} from "../../../atoms/atom-bentobox";
import {AtomColumn, AtomLayoutSize} from "../../../atoms/atom-layout";
import {AtomHeroBrandTitleText, AtomPrimaryText} from "../../../atoms/atom-text";
import React from "react";
import AtomImage from "../../../atoms/atom-image";
import AtomHeroGrid from "../../../atoms/atom-hero-grid";
import AtomHeatmapChart from "../../../atoms/charts/atom-heatmap";


const IntroSection = () => {
	return (
		<AtomColumn>
			<AtomPrimaryText>
				In engineering design, problem-solving blends strategy and knowledge transfer, especially across three
				key approaches: control, heuristic, and learning. Research shows experts often lean on general control
				and heuristic strategies they’ve honed in their field, plus organized, abstract knowledge to tackle new
				problems. Schraagen describes two main strategies: progressive deepening—repeating sub-problems to build
				automatic responses—and mental simulation, where experts mentally predict outcomes before acting.
				Building on this, we study how graduate students solve novel problems to inform design education and
				computational design, aiming to support both engineering students and AI development.
			</AtomPrimaryText>
			<AtomImage src={IntroChart} alt={'Delta Design Cover'}/>
		</AtomColumn>
	)
}


const ObjectiveSection = () => {
	return (
		<AtomColumn>
			<AtomPrimaryText>
				This work introduces a digital Delta Design Game to study how designers tackle novel problems. The tool
				records each decision, allowing us to analyze behaviors of high vs. low performers and efficient vs.
				inefficient designers, focusing on how automaticity affects design outcomes. To this end, the
				overarching question this research seeks to answer is as follows: <br/>
			</AtomPrimaryText>
			<AtomHeroBrandTitleText>
				What design strategies do intermediate-level designers employ when challenged with a novel complex
				problem?
			</AtomHeroBrandTitleText>
		</AtomColumn>
	)
}

const GameSection = () => {
	return (
		<AtomColumn>
			<AtomPrimaryText>
				Delta-Design, a game that challenges designers by placing a typical configuration design problem in a
				world with altered physics, provides a unique opportunity to study how designers approach structurally
				similar but novel problems. To support design and data collection, we built a MATLAB-based GUI that
				mimics
				a real-world design environment. It includes error and success messages, blocks impossible actions, and
				three message boxes for feedback on Delta World Status, design details, and participant info. A control
				panel allows users to correct mistakes, and a summary panel displays design constraints and objectives.
			</AtomPrimaryText>
			<AtomImage src={GameUI} alt={'Delta Design Game UI'}/>
		</AtomColumn>
	)
}

const StateResultSection = () => {
	const stateHeatmap = {
		z: [
			[0.28, 0.27, 0.02, 0.02, 0.03, 0.04, 0.04, 0.0, 0.35], // S1
			[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // S2
			[0.0, 0.95, 0.0, 0.01, 0.0, 0.01, 0.79, 0.01, 0.02], // S3
			[0.65, 0.0, 0.05, 0.0, 0.01, 0.1, 0.84, 0.0, 0.89], // S4
		],
		x: [
			"Add UP Delta",
			"Add DOWN Delta",
			"Add Anchor",
			"Move",
			"Fine Control",
			"Flip",
			"Color",
			"Delete",
			"End Study"
		],
		y: ["S1", "S2", "S3", "S4"],
		colorscale: heatmapColorScale,
		title: 'Design Step vs Hidden States',
		xTitle: 'Design Step',
		yTitle: 'Hidden State',
		height: `400px` as ChartDimension,
	};
	
	const stateTransition = {
		z: [
			[0.05, 0.91, 0.03, 0],
			[0.75, 0.07, 0.05, 0.13],
			[0, 0.03, 0, 0.92],
			[0.01, 0.02, 0.65, 0.32],
		],
		x: ["S1", "S2", "S3", "S4"],
		y: ["S1", "S2", "S3", "S4"],
		colorscale: heatmapColorScale,
		title: 'Transition between Hidden States',
		xTitle: 'Hidden State',
		yTitle: 'Hidden State',
		height: `400px` as ChartDimension,
	}
	return (
		<AtomColumn size={AtomLayoutSize.FullWidth}>
			<AtomPrimaryText>
				We characterize patterns of design behaviors enacted by designers using Hidden Markov Models to
				investigate high- and low-performing designers (as classified using their design performance),
				and efficient- and inefficient designers (as classified using number of actions they took).
			</AtomPrimaryText>
			<AtomHeatmapChart
				{...stateHeatmap}
			/>
			<AtomPrimaryText>
				In this study, HMM highlighted variances and similarities in how different designer groups moved through
				latent states. The data was analyzed both in aggregate and through four distinct HMMs that modeled the
				core latent behavior “states” designers engaged in. Participants were intermediate-level designers from
				graduate engineering programs. Findings showed that while both efficient and inefficient designers could
				score well, their behavior patterns differed significantly.
			</AtomPrimaryText>
			<AtomHeatmapChart
				{...stateTransition}
			/>
		</AtomColumn>
	)
}

const ConclusionSection = () => {
	const results = [
		{
			size: BentoItemSize.Medium,
			summary: `High-performing designers tend to break down complex problems into manageable sub-problems and relate them to familiar concepts.`,
		},
		{
			size: BentoItemSize.Medium,
			summary: `The inefficient designers took a more trial-and-error approach, resulting in rougher state transitions via the HMM.`,
		},
		{
			size: BentoItemSize.Medium,
			summary: `Intermediate designers may still develop strategies for novel problems, illustrating design theory’s relevance in a group neither novice nor expert.`,
		}
	];
	return (
		<AtomColumn>
			<AtomPrimaryText>
				Interpreted through Schraagen’s design theory, we observed:
			</AtomPrimaryText>
			<AtomHeroGrid contentList={results}/>
		</AtomColumn>
	)
}

class DeltaDesign extends BlogInfo {
	constructor() {
		super({
			id: 'delta-threads',
			title: 'Delta Design',
			description: 'Characterizing individual design strategies using an interactive game',
			date: 'Aug 15, 2020',
			tags: ['Matlab', 'Game Dev', 'AI', 'Engineering Design'],
			cover: Cover,
			cardSize: BentoItemSize.Small,
			summary: `This project dives into how engineering students approach design challenges in a digital game that tracks
            every step. Analyzing behaviors from 15 participants, the study reveals that high-performing designers tend
            to break down complex problems into manageable sub-problems and relate them to familiar concepts. Both
            efficient and less efficient strategies can lead to high scores, but the top performers use a progressive
            deepening approach—starting with foundational structure before moving into detailed optimization.`,
			
			sections: [
				{
					name: 'intro',
					title: 'Introduction',
					children: <IntroSection/>
				},
				{
					name: 'objective',
					title: 'Objective',
					children: <ObjectiveSection/>
				},
				{
					name: 'game',
					title: 'Game',
					children: <GameSection/>
				},
				{
					name: 'state-result',
					title: 'State Result',
					children: <StateResultSection/>
				},
				{
					name: 'conclusion',
					title: 'Conclusion',
					children: <ConclusionSection/>
				}
			]
		})
	}
}

const deltaDesignInstance = new DeltaDesign();
export default deltaDesignInstance;