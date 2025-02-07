import React from "react";
import AtomTableOfContents from "../../atoms/atom-table-of-contents";
import { Element } from "react-scroll";
import { BlogInfo } from "./blog-info";
import {
  AtomDateAndText,
  AtomPrimaryText,
  AtomSecondaryBadge,
  AtomSuperHeroTitleText,
  AtomTitleText,
} from "../../atoms/atom-text";
import {
  AtomColumn,
  AtomRow,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../../atoms/atom-layout";
import { AtomBackgroundImage } from "../../atoms/atom-image";
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
    <AtomBackgroundImage className={className} src={image}>
      <AtomColumn
        size={LayoutSize.None}
        gap={LayoutGap.Small}
        alignment={LayoutAlign.Center}
        className={"bg-opacity-50 bg-primary backdrop-blur-sm p-16"}
      >
        <AtomSuperHeroTitleText>{title}</AtomSuperHeroTitleText>
        <AtomDateAndText>{date}</AtomDateAndText>
        <AtomPrimaryText className={"my-4 w-1/2"}>{summary}</AtomPrimaryText>
        <AtomRow
          smallDeviceAdjustment={true}
          alignment={LayoutAlign.Center}
          gap={LayoutGap.Small}
          className={"flex-wrap"}
          size={LayoutSize.FullWidth}
        >
          {tags.map((tag, index) => (
            <AtomSecondaryBadge key={index} className={"w-fit"}>
              {tag}
            </AtomSecondaryBadge>
          ))}
        </AtomRow>
      </AtomColumn>
    </AtomBackgroundImage>
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
      <AtomColumn className={"p-4 md:p-16"} size={LayoutSize.Fit}>
        <BlogHeader
          title={item.title}
          summary={item.summary}
          date={item.date}
          tags={item.tags}
          image={item.cover}
          className={"w-full h-fit rounded-lg"}
        />
        <AtomRow
          alignment={LayoutAlign.Start}
          gap={LayoutGap.Small}
          size={LayoutSize.FullWidth}
        >
          {tabs.length > 1 &&
            breakpoint !== ScreenSizeBreakPointAsString.Small && (
              <AtomTableOfContents
                sections={tabs}
                label={"Contents"}
                className={"sticky top-32 self-start w-1/4 my-16"}
              />
            )}
          <AtomColumn size={LayoutSize.FullWidth}>
            {item.sections.map(
              (secProps: BlogSectionContentProps, index: number) => (
                <BlogSection key={index} {...secProps} />
              ),
            )}
          </AtomColumn>
        </AtomRow>
      </AtomColumn>
    </>
  );
};

export default BlogConstructor;
