import React from "react";
import {registeredBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/math";
import {useNavigate} from "react-router-dom";
import {AtomCardGrid, AtomCardProps} from "../atoms/atom-card";
import {AtomColumn, LayoutGap, LayoutSize, AtomRow} from "../atoms/atom-layout";
import {AtomHeroBrandTitleText, AtomHeroTitleText} from "../atoms/atom-text";

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
		<AtomColumn gap={LayoutGap.Small}>
			<AtomHeroTitleText className={'text-center'}>
				Sometimes I document my
				<AtomHeroBrandTitleText>thoughts.</AtomHeroBrandTitleText>
			</AtomHeroTitleText>
			
			<AtomCardGrid
				items={allItems}
				className={'w-full mt-6 px-8'}
			/>
		</AtomColumn>
	);
};

export default BlogListing;
