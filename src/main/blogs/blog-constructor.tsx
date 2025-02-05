import React from "react";
import AtomTableOfContents from "../../atoms/atom-table-of-contents";
import { Element } from "react-scroll";
import { BlogInfo } from "./blog-info";
import {
  AtomDateAndText,
  AtomHeroTitleText,
  AtomPrimaryText,
  AtomSecondaryBadge,
  AtomTitleText,
} from "../../atoms/atom-text";
import {
  AtomColumn,
  AtomRow,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../../atoms/atom-layout";
import AtomStyledContainer from "../../atoms/atom-styled-container";
import AtomImage from "../../atoms/atom-image";
import {
  ScreenSizeBreakPointAsString,
  useScreenSizeBreakpoint,
} from "../../providers/screen";

interface BlogHeaderProps {
  title: string;
  summary: string;
  date: string;
  image: string;
  tags: string[];
  className?: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  summary,
  date,
  tags,
  image,
  className,
}) => {
  tags.sort((a, b) => a.length - b.length);
  return (
    <AtomStyledContainer className={className} scrollable={false}>
      <AtomRow
        size={LayoutSize.FullSize}
        gap={LayoutGap.Medium}
        alignment={LayoutAlign.None}
        smallDeviceAdjustment={true}
      >
        <AtomColumn
          size={LayoutSize.FullWidth}
          gap={LayoutGap.Small}
          alignment={LayoutAlign.Center}
        >
          <AtomHeroTitleText>{title}</AtomHeroTitleText>
          <AtomDateAndText>{date}</AtomDateAndText>
          <AtomPrimaryText className={"my-4"}>{summary}</AtomPrimaryText>
          <AtomRow
            smallDeviceAdjustment={true}
            alignment={LayoutAlign.Start}
            gap={LayoutGap.Small}
            className={"flex-wrap "}
            size={LayoutSize.FullWidth}
          >
            {tags.map((tag, index) => (
              <AtomSecondaryBadge key={index} className={"w-fit"}>
                {tag}
              </AtomSecondaryBadge>
            ))}
          </AtomRow>
        </AtomColumn>
        <AtomImage src={image} alt={title} className={"w-full h-full"} />
      </AtomRow>
    </AtomStyledContainer>
  );
};

export interface BlogSectionContentProps {
  name: string;
  title: string;
  children?: React.ReactNode;
}

const BlogSection: React.FC<BlogSectionContentProps> = React.memo(
  ({ name, title, children }) => {
    return (
      <Element
        name={name}
        className={
          "flex flex-col gap-4 w-full min-w-fit h-fit items-center my-16 px-8"
        }
      >
        <AtomTitleText className={"w-full text-left"}>{title}</AtomTitleText>
        <div className={"w-full justify-center items-center"}>{children}</div>
      </Element>
    );
  },
);

interface BlogConstructorProps {
  item: BlogInfo;
}

const BlogConstructor: React.FC<BlogConstructorProps> = ({ item }) => {
  const tabs = item.tabs();
  const breakpoint = useScreenSizeBreakpoint();
  return (
    <>
      <AtomColumn className={"p-4 md:p-16"} size={LayoutSize.FullSize}>
        <BlogHeader
          title={item.title}
          summary={item.summary}
          date={item.date}
          tags={item.tags}
          image={item.cover}
          className={"w-full h-full"}
        />
        <AtomColumn size={LayoutSize.None} className={"w-2/3"}>
          {item.sections.map(
            (secProps: BlogSectionContentProps, index: number) => (
              <BlogSection key={index} {...secProps} />
            ),
          )}
        </AtomColumn>
      </AtomColumn>
      {tabs.length > 1 && breakpoint !== "sm" && (
        <AtomTableOfContents
          sections={tabs}
          label={"Contents"}
          className={"fixed bottom-20 left-20 w-52 bg-primary"}
        />
      )}
    </>
  );
};

export default BlogConstructor;
