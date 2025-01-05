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
import {
	AtomDateAndText,
	AtomHeroTitleText,
	AtomPrimaryText,
	AtomSecondaryBadge,
	AtomTitleText
} from "../../atoms/atom-text";
import {
	AtomColumn,
	AtomGrid3,
	AtomLayoutAlignment,
	AtomLayoutGap,
	AtomLayoutSize,
	AtomRow
} from "../../atoms/atom-layout";


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
	tags.sort((a, b) => a.length - b.length);
	return (
		<header className="w-screen h-fit bg-transparent py-4">
			<AtomFullScreenContainer
				name='header'
				children={
				<AtomRow>
					<AtomColumn
						size={AtomLayoutSize.None}
						gap={AtomLayoutGap.None}
						alignment={AtomLayoutAlignment.None}
						className={'w-1/3'}
					>
						<AtomHeroTitleText text={title}/>
						<AtomDateAndText text={date}/>
						<AtomPrimaryText text={summary} className={'my-4'}/>
						<AtomGrid3 gap={AtomLayoutGap.Small}>
							{tags.map((tag, index) => (
								<AtomSecondaryBadge text={tag} key={index} className={'mx-1 w-full'}/>
							))}
						</AtomGrid3>
					</AtomColumn>
					<AtomImage src={coverImage} alt={'Cover'} className={'w-full'} />
				</AtomRow>
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
			className='w-full justify-center m-auto align-center'>
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
			children={
				<section
					className='flex flex-col justify-center align-center w-1/2 h-fit gap-2'>
					<AtomTitleText text={title} className={'w-full'}/>
					{paragraph && <div
                        className='text-lg w-fit lg:w-full mx-auto align-center'>
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