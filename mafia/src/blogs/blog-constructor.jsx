import React from 'react';
import TemplateCover from '../assets/main.jpg';
import FullScreenPage from "../base/full-page";
import BaseBlog from "./base-blog";

const BlogHeader = ({title, summary, date, tags, coverImage}) => {
    if (!coverImage) {
        coverImage = TemplateCover;
    }
    return (
        <header className="w-screen h-fit bg-base-200 py-8 px-4 md:px-16 shadow-lg">
            <FullScreenPage
                name='header'
                children={
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h1 className="text-5xl font-bold mb-4">{title}</h1>
                            <p className="text-left text-sm text-neutral">{date}</p>
                            <p className="text-lg mb-4 mt-4">{summary}</p>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <span key={index} className="badge badge-accent rounded-full">
                                {tag}
                            </span>
                                ))}
                            </div>
                        </div>
                        <img className='w-1/2 rounded-lg' src={coverImage} alt="Cover"></img>
                    </div>
                }
            />
        </header>
    );
};

const BlogConstructor = ({item}) => {
    if (!(item instanceof BaseBlog)){
        throw "Invalid type to construct blog-content";
    }
    return (
        <BlogHeader
            title={item.title}
            summary={item.summary}
            date={item.date}
            tags={item.tags}
            coverImage={item.cover}
        />
    )
}


export default BlogConstructor;