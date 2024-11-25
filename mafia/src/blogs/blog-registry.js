import cppThreads from "./cpp-threads";
import BlogConstructor from "./blog-constructor";
import {createRouterItem, rangesTo} from "../utils/types";

export const blogs = [
    cppThreads
]

export const makeBlogRouters = () => {
    return rangesTo(blogs, (blog) => {
        const blogComponent = () => {
            return (<BlogConstructor item={blog}/>);
        }
        return createRouterItem({
            path: blog.path,
            component: blogComponent
        });
    });
};

