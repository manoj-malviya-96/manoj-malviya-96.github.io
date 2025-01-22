import { BlogInfo } from "../blog-info";
import Cover from "./formlabs-sw-cover.jpg";
import Logo from "./preform-blue.ico";
import { BentoItemSize } from "../../../atoms/atom-bentobox";
import React from "react";
import { AtomPrimaryText } from "../../../atoms/atom-text";
import AtomHeroGrid from "../../../atoms/atom-hero-grid";
import { AtomColumn, LayoutAlign } from "../../../atoms/atom-layout";

const Achievements = () => {
  const contentList = [
    {
      summary: `Led the end-to-end development of high-performance and easy-to-use CAD features for a 3D print-preparation software (PreForm): auto-orientation, model-grouping and part cages.`,
      icon: "fas fa-cube",
      title: `CAD Tools`,
      size: BentoItemSize.Medium,
    },
    {
      summary: `Led the development of eco-system features,
                                            building and integrating APIs to create synergy for
                                            hardware and its supporting web/desktop applications.
                                            Enabled encrypted real-time information flow, e.g. real-time 3D Print monitoring.`,
      icon: "fas fa-circle-nodes",
      title: `Seamless Ecosystem`,
      size: BentoItemSize.Medium,
      link: {
        children: "E.g. Real Time 3D Print monitoring",
        url: "https://youtu.be/hWzOTDmyoxI?t=131",
      },
    },
    {
      summary: `Owned the development of a modular, scalable UI framework using C++ and Qt Framework. Facilitated seamless collaboration with UI/UX team and beta users, streamlining critical workflows.`,
      icon: "fa-brands fa-uikit",
      title: `Modern UI/UX`,
      size: BentoItemSize.Medium,
      link: {
        children: "e.g. seamless 3D print upload",
        url: "https://youtu.be/hWzOTDmyoxI?t=131",
      },
    },
    {
      summary: `Initiated and developed large-scale data analysis tools, enabling data-driven feature development and strategic decision-making. Used SQL (Big-Query), Redash, and Segment logging.`,
      icon: "fas fa-chart-line",
      title: `Big Data Analysis`,
      size: BentoItemSize.Medium,
    },
    {
      size: BentoItemSize.Small,
      icon: "fas fa-microchip",
      title: `Embedded Tools`,
      summary: `Spearheaded the development of embedded tools for servicing a flagship hardware product (e.g. introduced a maintenance tool, cutting error rates by ~15% and optimizing service workflows for greater efficiency`,
    },
    {
      title: `Team Player`,
      icon: "fas fa-users",
      size: BentoItemSize.Small,
      summary: `Led cross-functional teams, mentoring interns, conducting code reviews, and streamlining international collaboration. Drove test-driven development, fixed critical bugs, and set coding standards to enhance feature development.`,
    },
    {
      icon: "fas fa-award",
      title: `Performance Award`,
      size: BentoItemSize.Large,
      summary: `Awarded Performance Award for being among the Top 3 engineers in productivity, contribution and impact.`,
    },
  ];

  return (
    <AtomColumn alignment={LayoutAlign.Start}>
      <AtomPrimaryText>
        Here are some of the key achievements during my time at Formlabs as a
        Lead Software Engineer:
      </AtomPrimaryText>
      <AtomHeroGrid contentList={contentList} />
    </AtomColumn>
  );
};

class FormlabsSW extends BlogInfo {
  constructor() {
    super({
      id: "formlabs-software",
      title: "Senior Software Engineer",
      description: "Formlabs",
      date: "Oct 2023",
      tags: [
        "C++",
        "QML",
        "Optimization",
        "UI/UX",
        "Algorithms",
        "API Development",
        "Embedded",
      ],
      cover: Cover,
      logo: Logo,
      isNew: false,
      summary: `I led the development of advanced CAD features and optimization algorithms for 3D print-preparation software, improving performance and reliability. I owned the creation of scalable UI frameworks and streamlined workflows through close collaboration with cross-functional teams. Additionally, I built and integrated APIs for seamless ecosystem functionality, developed data analysis tools to enable strategic decision-making, and contributed to hardware servicing improvements. I also mentored team members, drove coding standards, and ensured quality through test-driven development.`,
      sections: [
        {
          name: "achievements",
          title: "Achievements",
          children: <Achievements />,
        },
      ],
    });
  }
}

export default FormlabsSW;
