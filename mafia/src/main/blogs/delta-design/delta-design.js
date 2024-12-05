import {
    BlogInfo,
    makeBlogCode,
    makeBlogHeroText,
    makeBlogImage,
    makeBlogSectionContent,
    makeHeroText
} from "../blog-info";
import Cover from "./cover.webp"
import {BentoboxSizeOption} from "../../../utils/enums";


import IntroChart from './background.png';

class DeltaDesign extends BlogInfo {
    constructor() {

        const introSection = makeBlogSectionContent({
            name: 'intro',
            icon: 'fa fa-info-circle',
            title: 'Introduction',
            paragraph: [`In engineering design, problem-solving blends strategy and knowledge transfer, especially across three
                key approaches: control, heuristic, and learning. Research shows experts often lean on general control
                and heuristic strategies they’ve honed in their field, plus organized, abstract knowledge to tackle new
                problems. Schraagen describes two main strategies: progressive deepening—repeating sub-problems to build
                automatic responses—and mental simulation, where experts mentally predict outcomes before acting.
                Building on this, we study how graduate students solve novel problems to inform design education and
                computational design, aiming to support both engineering students and AI development.`],
            media: makeBlogImage({source: IntroChart, label: 'Delta Design Cover'}),
        });

        const objectiveSection = makeBlogSectionContent({
            name: 'objective',
            icon: 'fa fa-bullseye',
            title: 'Objective',
            paragraph: [
                [`This work introduces a digital Delta Design Game to study how designers tackle novel problems. The tool
                records each decision, allowing us to analyze behaviors of high vs. low performers and efficient vs.
                inefficient designers, focusing on how automaticity affects design outcomes. To this end, the
                overarching question this research seeks to answer is as follows:`],
                {tag: 'br'},
            ],
            media: makeBlogHeroText({text: `What design strategies do intermediate-level designers 
                                employ when challenged with a novel complex problem?`}),
        });

        super({
            id: 'delta-threads',
            title: 'Delta Design',
            description: 'Dive deep into concurrency',
            date: 'Nov 21, 2024',
            tags: ['C++', 'Concurrency', 'Threads'],
            cover: Cover,
            card_size: BentoboxSizeOption.Regular,
            summary: `This project dives into how engineering students approach design challenges in a digital game that tracks
            every step. Analyzing behaviors from 15 participants, the study reveals that high-performing designers tend
            to break down complex problems into manageable sub-problems and relate them to familiar concepts. Both
            efficient and less efficient strategies can lead to high scores, but the top performers use a progressive
            deepening approach—starting with foundational structure before moving into detailed optimization.`,

            sections: [introSection, objectiveSection]
        })
    }
}

const deltaDesignInstance = new DeltaDesign();
export default deltaDesignInstance;