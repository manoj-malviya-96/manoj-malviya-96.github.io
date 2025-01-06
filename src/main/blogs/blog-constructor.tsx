import React from 'react';
import AtomCodeBlock, {CodeBlockProps} from "../../atoms/atom-code";
import AtomTableOfContents, {TableOfContentsItemProps} from "../../atoms/atom-table-of-contents";
import AtomImage from "../../atoms/atom-image";
import Plotter from "../../atoms/plotter";
import {Element} from 'react-scroll';
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
	tabs: TableOfContentsItemProps[];
	className?: string;
}

const BlogSidePanel: React.FC<BlogHeaderProps> = (
	{title, summary, date, tags, tabs, className}
) => {
	tags.sort((a, b) => a.length - b.length);
	return (
		<header className={`block md:fixed left-0 top-1/2 transform -translate-y-1/2
								p-4 mt-12 w-full ${className}`}>
			<AtomColumn
				size={AtomLayoutSize.Fit}
				gap={AtomLayoutGap.Small}
				alignment={AtomLayoutAlignment.None}
			>
				<AtomHeroTitleText text={title}/>
				<AtomDateAndText text={date}/>
				<AtomPrimaryText text={summary} className={'my-4'}/>
				<AtomGrid3 gap={AtomLayoutGap.Small}>
					{tags.map((tag, index) => (
						<AtomSecondaryBadge text={tag} key={index} className={'mx-1 w-full'}/>
					))}
				</AtomGrid3>
				{tabs.length > 1 && <AtomTableOfContents sections={tabs} label={'Contents'}/>}
			</AtomColumn>
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
		<Element
			name={name}
			className={'w-full h-fit items-center justify-center p-4 m-4'}
		>
			<section
				className='flex flex-col justify-center align-center w-full h-fit gap-2'>
				<AtomTitleText text={title} className={'w-full'}/>
				{paragraph && <div
                    className='text-lg w-fit lg:w-full mx-auto align-center'>
					{makeRichParagraph(paragraph)}
                </div>}
				<RenderMedia media={media}/>
			</section>
		</Element>
	)
});


interface BlogConstructorProps {
	item: BlogInfo;
}

const BlogConstructor: React.FC<BlogConstructorProps> = ({item}) => {
	return (
		<AtomRow alignment={AtomLayoutAlignment.Start} className={'relative px-8 w-screen h-fit border-2'}>
			<BlogSidePanel
				title={item.title}
				summary={item.summary}
				date={item.date}
				tags={item.tags}
				tabs={item.tabs()}
				className={'w-fit md:w-1/4'}
			/>
			<div className="inline-block w-full md:w-3/4 h-fit">
				{item.cover && <AtomImage
					src={item.cover} alt={item.title}
					className={'w-full p-4 m-4'}/>}
				{item.sections.map((secProps: BlogSectionContentProps, index: number) => (
					<BlogSection key={index} {...secProps} />
				))}
			</div>
		</AtomRow>
	)
}

export default BlogConstructor;