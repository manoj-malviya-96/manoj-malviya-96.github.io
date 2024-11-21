import React from 'react';
import TemplateCover from '../assets/main.jpg';

const BlogHeader = ({title, description, date, tags, coverImage}) => {
    if (!coverImage) {
        coverImage = TemplateCover;
    }
    return (
        <header className="w-full bg-base-200 py-8 px-4 md:px-16 shadow-lg"
            style={{backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                    <h1 className="text-5xl font-bold mb-4">{title}</h1>
                    <p className="text-left text-sm text-neutral">{date}</p>
                    <p className="text-lg mb-4 mt-4">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span key={index} className="badge badge-accent rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

const BlogContent = () => {
    return (
        <BlogHeader
            title="Understanding Multi-Threading"
            description="Dive deep into concurrency and race conditions in C++."
            date="November 21, 2024"
            tags={["C++", "Concurrency", "Threads"]}
            coverImage= {TemplateCover}
        />
    )
}


export default BlogContent;