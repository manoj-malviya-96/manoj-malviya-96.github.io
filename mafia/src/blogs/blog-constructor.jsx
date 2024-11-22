import React from 'react';
import TemplateCover from '../assets/main.jpg';
import FullScreenPage from "../base/full-page";
import {BaseBlog, BlogSectionContent} from "./base-blog";
import {validateClassType, validateStructType} from "../utils/types";
import TabBar from "../base/tab-bar";

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


//
// //! I want to do this-> Paragraph | BlogMedia. Only one pair is allowed at a time.
// // so items would look like.
// // [{paragraph: BlogMedia}, {paragraph: BlogMedia}....]
//
const BlogSection = ({section}) => {
    validateStructType(section, 'BlogSectionContent');
    console.log(section.paragraph);
    return (
        <FullScreenPage
            name="intro"
            title={section.title}
            children={
                <section className='grid-cols-1 md:grid-cols-2 w-full h-full'>
                    <p className='text-lg'>{section.paragraph}</p>
                    <img src={section.media.source} alt={section.media.label} className='w-1/2 rounded-lg'/>
                </section>
            }
        />
    )
}


const BlogConstructor = ({item}) => {
    validateClassType(item, BaseBlog);
    return (
        <div className='flex-row w-full h-fit'>
            <BlogHeader
                title={item.title}
                summary={item.summary}
                date={item.date}
                tags={item.tags}
                coverImage={item.cover}
            />
            {item.sections.map((sec) => {
                console.log(sec);
                return (<BlogSection section={sec}/>);
                })
            }
            {/*match the top margin of the navbar*/}
            <div className='flex-column bg-base-100 bg-opacity-50 backdrop-blur-md m-4
                            rounded-2xl fixed top-0 w-fit h-fit z-20'>
                <TabBar tabs={item.tabs()}/>
            </div>
        </div>
    )
}

export default BlogConstructor;