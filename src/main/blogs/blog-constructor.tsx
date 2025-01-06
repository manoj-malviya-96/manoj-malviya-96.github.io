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
	AtomClippedText,
	AtomDateAndText,
	AtomHeroTitleText,
	AtomPrimaryText,
	AtomSecondaryBadge,
	AtomTitleText
} from "../../atoms/atom-text";
import {
	AtomColumn,
	AtomGrid,
	AtomLayoutAlignment,
	AtomLayoutGap,
	AtomLayoutSize,
} from "../../atoms/atom-layout";
import AtomScrollContainer from "../../atoms/atom-scroll-container";


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
		<AtomScrollContainer className={className}>
			<AtomColumn
				size={AtomLayoutSize.FullWidth}
				gap={AtomLayoutGap.Small}
				alignment={AtomLayoutAlignment.None}
			>
				<AtomHeroTitleText text={title}/>
				<AtomDateAndText text={date}/>
				<AtomClippedText
					fullText={summary}
					maxLength={300}
					className={'my-4'}
					textComponentConstructor={AtomPrimaryText}
				/>
				<AtomGrid
					alignment={AtomLayoutAlignment.HStart}
					gap={AtomLayoutGap.Small}
					size={AtomLayoutSize.FullWidth}>
					{tags.map((tag, index) => (
						<AtomSecondaryBadge text={tag} key={index} className={'w-fit'}/>
					))}
				</AtomGrid>
				{tabs.length > 1 && <AtomTableOfContents sections={tabs} label={'Contents'} className={'w-full'}/>}
			</AtomColumn>
		</AtomScrollContainer>
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
			className='w-full justify-center mx-auto align-center'>
			{media.kind === "image" &&
                <AtomImage src={media.source}
                           alt={media.label}
                           showLabel={true}
                           className={'my-8 w-full'}/>
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
		<div className={'relative px-12 w-screen h-fit'}>
			<BlogSidePanel
				title={item.title}
				summary={item.summary}
				date={item.date}
				tags={item.tags}
				tabs={item.tabs()}
				className={`w-full max-h-screen md:w-1/4
							block md:fixed left-8 top-16
							bg-neutral bg-opacity-20 p-8 rounded-lg`}
			/>
			<div className="md:absolute left-1/4 px-8 top-0 w-full md:w-3/4 h-fit p-8">
				{item.cover && <AtomImage
                    src={item.cover} alt={item.title}
                    className={'w-full h-screen p-8'}/>}
				{item.sections.map((secProps: BlogSectionContentProps, index: number) => (
					<BlogSection key={index} {...secProps} />
				))}
			</div>
		</div>
	)
}

export default BlogConstructor;