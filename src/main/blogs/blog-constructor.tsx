import React from 'react';
import TemplateCover from '../assets/main.jpg';
import AtomFullScreenContainer from "../../atoms/atom-full-screen-container";
import {BlogInfo} from "./blog-info";
import AtomCodeBlock, {CodeBlockProps} from "../../atoms/atom-code";
import AtomTableOfContents from "../../atoms/atom-table-of-contents";
import AtomImage from "../../atoms/atom-image";
import Plotter from "../../atoms/plotter";
import AtomHeroText from "../../atoms/atom-hero-text";
import AtomHeroList from "../../atoms/atom-hero-list";
import {
    InlineContentType,
    makeRichParagraph
} from "../../common/inline-content";


interface BlogHeaderProps {
    title: string;
    summary: string;
    date: string;
    tags: string[];
    coverImage: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = (
    {title, summary, date, tags, coverImage}
) => {
    if (!coverImage) {
        coverImage = TemplateCover;
    }
    return (
        <header className="w-screen h-fit bg-transparent py-4">
            <AtomFullScreenContainer
                name='header'
                children={
                    <div
                        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h1 className="text-5xl font-bold mb-4 uppercase">{title}</h1>
                            <p className="text-left text-sm text-neutral">{date}</p>
                            <p className="text-lg mb-4 mt-4">{summary}</p>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <span key={index}
                                          className="badge badge-accent rounded-full">
                                {tag}
                            </span>
                                ))}
                            </div>
                        </div>
                        <AtomImage
                            className='w-fit md:w-1/2 rounded-lg'
                            src={coverImage} alt="Cover"></AtomImage>
                    </div>
                }
            />
        </header>
    );
};


export interface BlogImageProps {
    kind: "image";
    source: string;
    label: string;
}

export interface BlogCodeProps {
    kind: "code";
    language: CodeBlockProps['language'];
    code: string;
}

export interface BlogPlotProps {
    kind: "plot";
    dataTrace: any;
    title: string;
    xTitle: string;
    yTitle: string;
    textColor: string;
}

export interface BlogHeroTextProps {
    kind: "heroText";
    text: string;
}

export interface BlogHeroListProps {
    kind: "heroList";
    contentList: string[];
    numbered: boolean;
}

export type BlogMediaType =
    BlogImageProps
    | BlogCodeProps
    | BlogPlotProps
    | BlogHeroTextProps
    | BlogHeroListProps
    | undefined;

export interface BlogSectionContentProps {
    name: string;
    title: string;
    paragraph?: InlineContentType[];
    media: BlogMediaType;
}


const BlogSection: React.FC<BlogSectionContentProps> = ({
                                                            name,
                                                            title,
                                                            paragraph,
                                                            media
                                                        }) => {
    
    const RenderMedia: React.FC<{
            media: BlogMediaType
        }> = ({media}) => {
            if (media === undefined) {
                return <></>;
            }
            return (
                <div
                    className='w-full lg:w-1/2 justify-center m-auto align-center'>
                    {media.kind === "image" &&
                        <AtomImage src={media.source}
                                   alt={media.label}
                                   showLabel={true}
                                   className={'m-auto align-center justify-center w-full'}/>
                    }
                    {media.kind === 'code' && (
                        <AtomCodeBlock language={media.language}
                                       code={media.code}
                                       className="m-auto align-center justify-center w-full"/>
                    )}
                    
                    {media.kind === 'plot' &&
                        <Plotter
                            dataTrace={media.dataTrace}
                            className={'m-auto align-center justify-center w-full'}
                            title={media.title}
                            xTitle={media.xTitle}
                            yTitle={media.yTitle}
                            textColor={media.textColor}
                            minimalView={false}
                        />
                    }
                    {media.kind === 'heroText' &&
                        <AtomHeroText text={media.text}
                                      className='w-full'/>
                    }
                    {media.kind === 'heroList' &&
                        <AtomHeroList contentList={media.contentList}
                                      numbered={media.numbered}
                                      className='w-full'/>
                    }
                </div>
            )
        }
    ;
    return (
        <AtomFullScreenContainer
            name={name}
            title={title}
            children={
                <section
                    className='flex flex-col justify-center align-center w-full h-fit gap-8'>
                    {paragraph && <div
                        className='text-lg w-fit lg:w-1/2 m-auto align-center'>
                        {makeRichParagraph(paragraph)}
                    </div>}
                    <RenderMedia media={media}/>
                </section>
            }
        />
    )
}


interface BlogConstructorProps {
    item: BlogInfo;
}

const BlogConstructor: React.FC<BlogConstructorProps> = ({item}) => {
    return (
        <div className="flex flex-col w-full h-fit">
            <BlogHeader
                title={item.title}
                summary={item.summary}
                date={item.date}
                tags={item.tags}
                coverImage={item.cover}
            />
            {/* Table of Contents - padding is left 16, as i use padding-16 for full page view */}
            <div
                className="sticky left-16 top-1/2 hidden md:inline-block w-fit h-fit">
                <AtomTableOfContents sections={item.tabs()}/>
            </div>
            {/* Blog Content */}
            <div className="inline-block w-full h-fit">
                {item.sections.map((secProps, index) => (
                    <BlogSection key={index} {...secProps} />
                ))}
            </div>
        </div>
    
    )
}

export default BlogConstructor;