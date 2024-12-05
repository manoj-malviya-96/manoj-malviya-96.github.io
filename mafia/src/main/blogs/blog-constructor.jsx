import React from 'react';
import TemplateCover from '../assets/main.jpg';
import FullScreenPage from "../../base/full-page";
import {BlogInfo} from "./blog-info";
import {validateClassType, validateStructType} from "../../utils/types";
import CodeBlock from "../../base/code";
import {TopTabBar} from "../top-modal";
import PhotoViz from "../../base/photo";
import Plotter from "../../base/plotter";
import HeroText from "../../base/HeroText";

const BlogHeader = ({title, summary, date, tags, coverImage}) => {
    if (!coverImage) {
        coverImage = TemplateCover;
    }
    return (
        <header className="w-screen h-fit bg-base-200 py-4 shadow-lg">
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
function makeRichParagraph(contentArray) {
    return contentArray.map((content, index) => {
        if (typeof content === 'string') {
            // Render plain string as a paragraph
            return <p key={index}>{content}</p>;
        } else if (Array.isArray(content)) {
            // Render a paragraph with inline formatting
            return (
                <p key={index}>
                    {content.map((item, subIndex) =>
                        typeof item === 'string' ? (
                            item
                        ) : (
                            // Add styling for inline elements
                            React.createElement(
                                item.tag,
                                {
                                    key: subIndex, ...item.props,
                                    className: `${item.props?.className || ''} 
                                                ${item.tag === 'code' ? 'text-info px-1' : ''}`.trim()
                                },
                                item.children
                            )
                        )
                    )}
                </p>
            );
        } else if (content.tag) {
            // Handle standalone tags (e.g., <br>, <hr>)
            return React.createElement(content.tag, {key: index, ...content.props});
        }
        return null; // Handle invalid content gracefully
    });
}


const BlogSection = ({section}) => {
    validateStructType(section, 'BlogSectionContent');
    return (
        <FullScreenPage
            name={section.name}
            title={section.title}
            children={
                <section className='flex flex-col justify-center align-center w-full h-fit gap-8 mt-4'>
                    <div className='text-lg w-fit md:w-1/2 m-auto align-center'>
                        {makeRichParagraph(section.paragraph)}
                    </div>
                    {section.media &&
                        <div className='w-full justify-center m-auto align-center'>
                            {section.media.typeKey === 'BlogImage' &&
                                <PhotoViz src={section.media.source} alt={section.media.label}
                                          className={'m-auto align-center justify-center w-full md:w-1/2'}/>
                            }
                            {section.media.typeKey === 'BlogCode' && (
                                <CodeBlock language={section.media.language} code={section.media.code}
                                           className="m-auto align-center justify-center w-full md:w-1/2"/>
                            )}

                            {section.media.typeKey === 'BlogPlot' &&
                                <Plotter
                                    dataTrace={section.media.plot}
                                    height={480}
                                    width={640}
                                />
                            }
                            {section.media.typeKey === 'BlogHeroText' &&
                                <HeroText text={section.media.text} className='w-fit md:w-1/2'/>
                            }
                        </div>
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
            <TopTabBar tabs={item.tabs()}/>
        </div>
    )
}

export default BlogConstructor;