import React, { useEffect } from "react";
import Intro from "./intro";
import BlogListing from "./blog-list";
import AboutMe from "./about-me";
import BrandLogo from "./assets/logo.svg";
import ToolDrawer from "./tool-drawer";
import { useNavbar } from "../providers/navbar";
import { AtomLinkBar } from "../atoms/atom-bars";
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import { AtomPrimaryText } from "../atoms/atom-text";
import {
  AtomColumn,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../atoms/atom-layout";
import Hobbies from "./hobbies";

const Home = () => {
  const { updateBrand } = useNavbar();
  useEffect(() => {
    updateBrand({
      logo: BrandLogo,
      name: "MAFIA",
    });
  }, [updateBrand]);

  const tabs = [
    { name: "about-me", children: <AtomPrimaryText>About Me</AtomPrimaryText> },
    { name: "playground", children: <AtomPrimaryText>Tools</AtomPrimaryText> },
    { name: "blog", children: <AtomPrimaryText>Blogs</AtomPrimaryText> },
    { name: "hobby", children: <AtomPrimaryText>Hobby</AtomPrimaryText> },
  ];

  return (
    <div className={"w-full h-full"}>
      <Intro />
      <AtomColumn
        size={LayoutSize.FullSize}
        gap={LayoutGap.None}
        alignment={LayoutAlign.None}
      >
        <AtomFullScreenContainer name={"about-me"}>
          <AboutMe />
        </AtomFullScreenContainer>

        <AtomFullScreenContainer name={"playground"}>
          <ToolDrawer />
        </AtomFullScreenContainer>

        <AtomFullScreenContainer name={"blog"}>
          <BlogListing />
        </AtomFullScreenContainer>

        <AtomFullScreenContainer name={"hobby"}>
          <Hobbies />
        </AtomFullScreenContainer>
      </AtomColumn>
      <AtomLinkBar
        items={tabs}
        className={"fixed bottom-4 left-1/2 -translate-x-1/2 h-fit z-20"}
      />
    </div>
  );
};

export default Home;
