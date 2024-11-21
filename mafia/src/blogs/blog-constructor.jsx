
import React from "react";
import BlogContent from "../base/blog-content";


const BlogConstructor = ({ blogs, params }) => {
    const { blogId } = params;
    const blog = blogs.find((b) => b.id === blogId);

    if (!blog) return <p>Blog not found!</p>;

    return (
        <div>
            <BlogContent item={blog}/>
        </div>
    );
};

export default BlogConstructor;