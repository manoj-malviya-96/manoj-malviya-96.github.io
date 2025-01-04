import React, {ComponentType} from "react";
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import {registeredBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/math";
import {useNavigate} from "react-router-dom";
import AtomBentoBox, {BentoBoxItemProps} from "../atoms/atom-bentobox";
import {AtomCardProps, AtomImageCard} from "../atoms/atom-card";
import {AtomColumn, AtomLayoutGap, AtomLayoutSize, AtomRow} from "../atoms/atom-layout";
import {AtomHeroBrandTitleText, AtomHeroTitleText} from "../atoms/atom-text";

const BlogListing = () => {
	const navigate = useNavigate();
	
	// Convert blogs into items for AtomCard
	const allItems = rangesTo(registeredBlogs, (blog) => {
		return {
			title: blog.title,
			description: blog.description,
			size: blog.cardSize,
			date: blog.date,
			category: blog.category,
			image: blog.cover,
			isNew: blog.isNew,
			onClick: () => navigate(blog.path),
		} as AtomCardProps;
	});
	
	return (
		<AtomFullScreenContainer
			name="blog"
		>
			<AtomColumn gap={AtomLayoutGap.Small}>
				<AtomRow size={AtomLayoutSize.None} className={'w-2/3'} gap={AtomLayoutGap.ExtraSmall}>
					<AtomHeroTitleText text={'Sometimes I document my'}/>
					<AtomHeroBrandTitleText text={'thoughts.'}/>
				</AtomRow>
				<AtomBentoBox
					items={allItems}
					columns={4}
					className={'mx-auto w-2/3'}
					autoRowsSize={220}
					component={AtomImageCard as unknown as ComponentType<BentoBoxItemProps>}
				/>
			</AtomColumn>
		</AtomFullScreenContainer>
	);
};

export default BlogListing;
