import React from "react";
import { registeredBlogs } from "./blogs/blog-registry";
import { rangesTo } from "../common/math";
import { useNavigate } from "react-router-dom";
import AtomCard, { AtomCardProps } from "../atoms/atom-card";
import {
  AtomColumn,
  AtomGrid,
  GridColumns,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../atoms/atom-layout";
import { AtomHeroBrandTitleText, AtomTitleText } from "../atoms/atom-text";

const BlogListing = () => {
  const navigate = useNavigate();

  // Convert blogs into items for AtomCard
  const allItems = rangesTo(registeredBlogs, (blog) => {
    return {
      title: blog.title,
      description: blog.description,
      date: blog.date,
      category: blog.category,
      image: blog.cover,
      isNew: blog.isNew,
      onClick: () => navigate(blog.path),
    } as AtomCardProps;
  });

  return (
    <AtomColumn gap={LayoutGap.Small} size={LayoutSize.FullSize}>
      <AtomTitleText className={"text-center"}>
        Documenting
        <AtomHeroBrandTitleText>thoughts.</AtomHeroBrandTitleText>
      </AtomTitleText>
      <AtomGrid
        className={"w-full mt-6 px-8"}
        size={LayoutSize.Fit}
        gap={LayoutGap.Medium}
        nCols={GridColumns.Four}
        alignment={LayoutAlign.Start}
      >
        {allItems.map((item, index) => (
          <AtomCard {...item} key={index} />
        ))}
      </AtomGrid>
    </AtomColumn>
  );
};

export default BlogListing;
