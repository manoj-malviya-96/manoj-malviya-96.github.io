import { BlogInfo } from "../blog-info";
import Cover from "./cover.webp";
import BoundaryCond from "./boundary_condition.png";
import DataSetup from "./representation.png";
import Models from "./models.png";
import Result from "./results.png";
import { AtomColumn } from "../../../atoms/atom-layout";
import React from "react";
import { AtomPrimaryText } from "../../../atoms/atom-text";
import AtomImage from "../../../atoms/atom-image";

const IntroSection = () => {
  return (
    <AtomColumn>
      <AtomPrimaryText>
        The work investigates an additively manufactured Michell beam as a use
        case for the proposed deep learning framework. We implemented the SIMP
        model. topology optimization to generate a training dataset. We
        generated 60,000 data points considering different boundary (BC) and
        loading conditions (LC), geometric constraints, and volume fraction
        (VF). <br />
        In addition to variety in boundary and loading conditions in the
        dataset, we also considered the presence of active and passive elements.
        Volume fraction, an important hyper-parameter and design decision is
        also being considered as a varying parameter. However, other
        hyper-parameters such as filter radius and penalty factor were kept
        constant as per best heuristics followed in practice (filter radius = 2,
        penalty factor p = 3).
      </AtomPrimaryText>
      <AtomImage src={BoundaryCond} alt={"Topology Optimization Problem"} />
    </AtomColumn>
  );
};

const DataSection = () => {
  return (
    <AtomColumn>
      <AtomPrimaryText>
        The images were created at both low and high resolution. The five images
        represent different aspects of the problem: volume fraction with
        available design space, loading and boundary conditions in X and Y
        directions, as shown in Figure 2 with a sample TO problem. This type of
        input dataset will ensure the generalizability and quality of the data
        for training with varying design space and loading and boundary
        conditions, as validated previously in [3]. We represent design space
        and volume fraction using a single image, thereby reducing computational
        time. We define volume fraction to be the inverse of the pixel intensity
        of the design space image. A black pixel (with intensity = 0) represents
        a 100% dense volume fraction, while a white pixel (with intensity = 255)
        represents a 0% volume fraction. The active and passive elements are
        represented as black and white pixels respectively in the same image as
        the volume fraction.
      </AtomPrimaryText>
      <AtomImage src={DataSetup} alt={"Data Representation"} />
    </AtomColumn>
  );
};

const ModelsSection = () => {
  return (
    <AtomColumn>
      <AtomPrimaryText>
        We explored four different generative models to achieve a high quality
        rapid design agent. Out of this four, TOP-GAN, a variant of pix2pix
        out-perform others in terms of quality and performance. More details can
        be found in the report.
      </AtomPrimaryText>
      <AtomImage
        src={Models}
        alt={"Summarizing performance of various models"}
      />
    </AtomColumn>
  );
};

const ConclusionSection = () => {
  return (
    <AtomColumn>
      <AtomPrimaryText>
        Though TOP-GAN is powerful enough to rapidly generate high quality
        solutions, it is unable to generate fine structures. Additionally, the
        model outputs only one solution whereas in real-life, multiple solutions
        are possible. To advance the TOP-GAN and solve these problems, we
        introduce deep learning based model. This model excel at both generating
        at higher resolution and ability to produce multiple solutions. This is
        achieved using advance techniques found in literature - MSG-GAN, Spade
        normalization and multi-modal input. The details of the model and
        results will be uploaded soon after the journal paper is published.
      </AtomPrimaryText>
      <AtomImage
        src={Result}
        alt={"Summarizing performance of various models"}
      />
    </AtomColumn>
  );
};

class RapidTopt extends BlogInfo {
  constructor() {
    super({
      id: "rapid-topt",
      title: "Rapid Topt",
      description: "Rapid Topology Optimization using Deep Generative Models",
      date: "Aug 15, 2020",
      tags: ["Gen Design", "Optimization", "AI", "GPU"],
      cover: Cover,
      summary: `With the rise of Additive Manufacturing (AM) and Computational Sciences,
            design algorithms like Topology Optimization (TO) have attracted academic and industrial 
            interest. TO aims to optimize structures by maximizing stiffness, given geometric, 
            loading, and boundary conditions. However, these approaches are computationally 
            expensive due to convergence issues. This work explores the effectiveness of deep 
            generative models on diverse topology optimization problems with varying constraints. 
            Four distinct models were developed, trained, and evaluated to generate rapid designs 
            comparable to conventional algorithms. Our findings demonstrate the effectiveness of 
            the novel design problem representation and proposed generative models in rapid topology 
            optimization.`,

      sections: [
        {
          name: "intro",
          title: "Introduction",
          children: <IntroSection />,
        },
        {
          name: "data-setup",
          title: "Data Setup",
          children: <DataSection />,
        },
        {
          name: "models",
          title: "Models",
          children: <ModelsSection />,
        },
        {
          name: "conclusion",
          title: "Conclusion",
          children: <ConclusionSection />,
        },
      ],
    });
  }
}

export default RapidTopt;
