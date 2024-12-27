import {BlogInfo} from "../blog-info";
import Cover from "./formlabs-sw-cover.jpg";
import Logo from "./preform-blue.ico";

class FormlabsSW extends BlogInfo {
    constructor() {
        super({
            id: 'formlabs-software',
            title: 'Lead Software Engineer',
            description: 'Formlabs',
            date: 'Oct 2023',
            tags: ['C++', 'QML', 'Optimization', 'UI/UX', 'Algorithms', 'API Development', 'Embedded'],
            cover: Cover,
            logo: Logo,
            isNew: false,
            summary: `I led the development of advanced CAD features and optimization algorithms for 3D print-preparation software, improving performance and reliability. I owned the creation of scalable UI frameworks and streamlined workflows through close collaboration with cross-functional teams. Additionally, I built and integrated APIs for seamless ecosystem functionality, developed data analysis tools to enable strategic decision-making, and contributed to hardware servicing improvements. I also mentored team members, drove coding standards, and ensured quality through test-driven development.`,
            sections: [
                {
                    name: 'key-achievements',
                    title: 'Key Achievements',
                    media: {
                        kind: 'heroList',
                        contentList: [
                            {
                                summary: `Engineered advanced CAD features and automated algorithms for 3D print-preparation software`,
                                icon: 'fas fa-cube',
                                title: `5X`,
                            },
                            `Led the development of ecosystem features, building and integrating APIs between hardware and desktop applications, to enable real-time  encrypted information flow, e.g. hardware camera streaming via secure local network`,
                            `Owned the development of a modular, scalable UI framework using C++ and Qt Framework. Facilitated seamless collaboration with UI/UX team and beta users, streamlining critical workflows (e.g. seamless 3D print upload).`,
                            `Initiated and developed large-scale data analysis tools, enabling data-driven feature development and strategic decision-making. Used SQL (BigQuery), Redash, and Segment logging.`,
                            `Spearheaded the development of embedded tools for servicing a flagship hardware product (e.g. introduced a maintenance tool, cutting error rates by ~15% and optimizing service workflows for greater efficiency).`,
                            `Led cross-functional teams, mentoring interns, conducting code reviews, and streamlining international collaboration. Drove test-driven development, fixed critical bugs, and set coding standards to enhance feature development.`,
                            `Awarded Performance Award for being among the Top 3 engineers in productivity, contribution and impact.`
                        ]
                    }
                }
            ],
        });
    }
}

const formlabsSWInstance = new FormlabsSW();
export default formlabsSWInstance;