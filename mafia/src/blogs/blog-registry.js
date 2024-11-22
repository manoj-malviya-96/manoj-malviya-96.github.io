import cppThreads from "./cpp-threads";
import BlogConstructor from "./blog-constructor";
import {rangesTo} from "../utils/types";

export const blogs = [
    cppThreads
]

export const makeBlogRouters = () => {
    return rangesTo(blogs, (blog) => {
        const blogComponent = () => {
            return (<BlogConstructor item={blog}/>);
        }
        return {
            path: blog.path(),
            component: blogComponent
        };
    });
};