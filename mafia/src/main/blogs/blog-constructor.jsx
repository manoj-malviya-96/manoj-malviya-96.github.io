import React from 'react';
import TemplateCover from '../assets/main.jpg';
import FullScreenPage from "../../base/full-page";
import {BlogInfo} from "./blog-info";
import {validateClassType, validateStructType} from "../../utils/types";
import TabBar from "../../base/tab-bar";
import CodeBlock from "../../base/code";
import TabBarOnTop from "../tab-bar-on-top";

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
                        <img className='w-fit md:w-1/2 rounded-lg' src={coverImage} alt="Cover"></img>
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
    return (
        <FullScreenPage
            name={section.name}
            title={section.title}
            children={
                <section className='flex flex-col justify-center align-center w-full h-fit gap-8 mt-4'>
                    <div className='text-lg w-fit md:w-1/2 m-auto align-center'
                         dangerouslySetInnerHTML={{__html: section.paragraph}}/>
                    {section.media.typeKey === 'BlogImage' &&
                        <img src={section.media.source} alt={section.media.label}
                             className='w-fit justify-center m-auto align-center rounded-lg'/>
                    }
                    {section.media.typeKey === 'BlogCode' && (
                        <CodeBlock language={section.media.language} code={section.media.code}
                                   className='w-fit justify-center m-auto align-center'/>
                    )}

                    {section.media.typeKey === 'BlogPlot' &&
                        <section
                            className='w-fit justify-center m-auto align-center bg-base-300 p-4 rounded-lg'>{section.media.plot}</section>
                    }
                </section>
            }
        />
    )
}


const BlogConstructor = ({item}) => {
    validateClassType(item, BlogInfo);
    return (
        <div className='flex-row w-full h-fit'>
            <BlogHeader
                title={item.title}
                summary={item.summary}
                date={item.date}
                tags={item.tags}
                coverImage={item.cover}
            />
            {item.sections.map((sec, index) => {
                return (<BlogSection key={index} section={sec}/>);
            })
            }
            <TabBarOnTop tabs={item.tabs()}/>
        </div>
    )
}

export default BlogConstructor;