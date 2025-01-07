import React from 'react';
import AtomTableOfContents, {TableOfContentsItemProps} from "../../atoms/atom-table-of-contents";
import AtomImage from "../../atoms/atom-image";
import {Element} from 'react-scroll';
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
import AtomStyledContainer from "../../atoms/atom-styled-container";


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
		<AtomStyledContainer className={className}>
			<AtomScrollContainer>
				<AtomColumn
					size={AtomLayoutSize.FullWidth}
					gap={AtomLayoutGap.Small}
					alignment={AtomLayoutAlignment.None}
				>
					<AtomHeroTitleText>{title}</AtomHeroTitleText>
					<AtomDateAndText>{date}</AtomDateAndText>
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
							<AtomSecondaryBadge key={index} className={'w-fit'}>{tag}</AtomSecondaryBadge>
						))}
					</AtomGrid>
					{tabs.length > 1 && <AtomTableOfContents sections={tabs} label={'Contents'} className={'w-full'}/>}
				</AtomColumn>
			</AtomScrollContainer>
		</AtomStyledContainer>
	);
};

export interface BlogSectionContentProps {
	name: string;
	title: string;
	children?: React.ReactNode;
}

const BlogSection: React.FC<BlogSectionContentProps> = React.memo(({
	                                                                   name,
	                                                                   title,
	                                                                   children
                                                                   }) => {
	return (
		<Element
			name={name}
			className={'flex flex-col w-full h-fit items-center justify-center my-8'}
		>
			<AtomTitleText className={'w-full'}>{title}</AtomTitleText>
			{children}
		</Element>
	)
});


interface BlogConstructorProps {
	item: BlogInfo;
}

const BlogConstructor: React.FC<BlogConstructorProps> = ({item}) => {
	return (
		<div className={'relative px-4 py-6'}>
			<BlogSidePanel
				title={item.title}
				summary={item.summary}
				date={item.date}
				tags={item.tags}
				tabs={item.tabs()}
				className={`w-full max-h-screen md:w-1/4 mt-24 block md:fixed left-6 top-0`}
			/>
			<div className="md:absolute left-1/4 md:p-16 top-0 w-full md:w-3/4 h-fit">
				{item.cover && <AtomImage
                    src={item.cover} alt={item.title}
                    className={'mx-auto w-full md:w-2/3 p-8'}/>}
				{item.sections.map((secProps: BlogSectionContentProps, index: number) => (
					<BlogSection key={index} {...secProps} />
				))}
			</div>
		</div>
	)
}

export default BlogConstructor;