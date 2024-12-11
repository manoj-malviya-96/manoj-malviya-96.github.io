import {BlogInfo} from "../blog-info";
import Cover from "./formlabs-rd-cover.jpg";

class FormlabsRd extends BlogInfo {
    constructor() {
        super({
            id: 'cpp-threads',
            title: 'R&D Software Engineer',
            description: 'Formlabs',
            date: 'Jan 1, 2020',
            tags: ['C++', 'Optimization', 'Physics Modelling', 'Web Development', 'Process Engineer'],
            cover: Cover,
            isNew: false,
            summary: `I was responsible for improving core product performance, making systems more reliable and efficient, and reducing resource waste. I worked on creating tools to help teams collaborate better and make data-driven decisions. My role also involved refining processes with advanced modeling and enhancing predictive accuracy to improve outcomes and overall user experience.`,
            sections: [
                {
                    kind: 'heroList',
                    contentList: [
                        `Revamped the core product feature (3D-printing support generation) and pioneered a patent-pending truss optimization algorithm that significantly improved reliability, and achieved  a ~70% extra material reduction.`,
                        `Developed and maintained internal website hosting computational, data-collection and analytical tools, allowing other teams to work more efficiently and provide a single source of truth for critical decisions.`,
                        `Authored an internal-use book on computational physics modeling for the company's flagship products, detailing key aspects of the print process, underlying physics, parameter-driven behaviors, and optimization strategies.`,
                        `Led cross-functional teams to optimize material settings for flagship products using advanced computational models and precision experiments, enhancing reliability and performance.`,
                        `Reduced 3D print-time-estimation error by 10% and computation time by 75% through an approximate physics model.`,
                    ]
                }
            ],
        });
    }
}

const formlabsRDInstance = new FormlabsRd();
export default formlabsRDInstance;