import React from 'react';
import TemplateCover from '../assets/main.jpg';
import AtomFullScreenContainer from "../../atoms/atom-full-screen-container";
import AtomCodeBlock, {CodeBlockProps} from "../../atoms/atom-code";
import AtomTableOfContents from "../../atoms/atom-table-of-contents";
import AtomImage from "../../atoms/atom-image";
import Plotter from "../../atoms/plotter";
import AtomHeroGrid, {AtomHeroGridItemProps} from "../../atoms/atom-hero-grid";
import {InlineContentType, makeRichParagraph} from "../../common/inline-content";
import {BlogInfo} from "./blog-info";
import {AtomDateAndText, AtomHeroTitleText, AtomPrimaryText} from "../../atoms/atom-text";


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
						<div className="flex flex-col w-1/2 gap-0">
							<AtomHeroTitleText text={title}/>
							<AtomDateAndText text={date}/>
							<AtomPrimaryText text={summary} className={'mt-4'}/>
							<div className="flex flex-wrap gap-2 mt-4">
								{tags.map((tag, index) => (
									<span key={index}
									      className="badge badge-secondary rounded-md">
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
	contentList: AtomHeroGridItemProps[];
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

const RenderMedia: React.FC<{
	media: BlogMediaType
}> = React.memo(({media}) => {
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
                <AtomHeroTitleText text={media.text}
                                   className='w-full'/>
			}
			{media.kind === 'heroList' &&
                <AtomHeroGrid contentList={media.contentList}
                              className='w-full'/>
			}
		</div>
	)
});


const BlogSection: React.FC<BlogSectionContentProps> = React.memo(({
	                                                                   name,
	                                                                   title,
	                                                                   paragraph,
	                                                                   media
                                                                   }) => {
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
});


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
				className="sticky left-8 top-1/2 hidden md:inline-block w-44 text-wrap h-fit">
				<AtomTableOfContents sections={item.tabs()}/>
			</div>
			{/* Blog Content */}
			<div className="inline-block w-full h-fit">
				{item.sections.map((secProps: BlogSectionContentProps, index: number) => (
					<BlogSection key={index} {...secProps} />
				))}
			</div>
		</div>
	
	)
}

export default BlogConstructor;