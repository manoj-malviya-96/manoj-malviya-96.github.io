import React, {ComponentType} from "react";
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import {registeredBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/math";
import {useNavigate} from "react-router-dom";
import AtomBentoBox, {BentoBoxItemProps} from "../atoms/atom-bentobox";
import {AtomCardProps, AtomImageCard} from "../atoms/atom-card";

const BlogListing = () => {
    const navigate = useNavigate();
    
    // Convert blogs into items for AtomCard
    const items = rangesTo(registeredBlogs, (blog) => {
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
            title="Blogs"
            description={`A collection of blogs on various topics.
                            Simply my thoughts and experiences with tech and life.`}
            name="blog"
        >
            <AtomBentoBox
                items={items}
                columns={5}
                className={'mx-auto w-3/4'}
                autoRowsSize={269}
                component={AtomImageCard as unknown as ComponentType<BentoBoxItemProps>}
            />
        </AtomFullScreenContainer>
    );
};

export default BlogListing;
