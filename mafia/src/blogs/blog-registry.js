import cppThreads from "./cpp-threads";
import BlogContent from "./blog-content";
import {rangesTo} from "../utils/types";

export const blogs = [
    cppThreads
]

export const makeBlogRouters = () => {
    return rangesTo(blogs, (blog) => {
        const blogComponent = () => {
            return (<BlogContent item={blog}/>);
        }
        return {
            path: blog.path(),
            component: blogComponent
        };
    });
};