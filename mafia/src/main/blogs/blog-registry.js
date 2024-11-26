import cppThreadsInstance from "./cpp-threads";
import BlogConstructor from "./blog-constructor";
import {createRouterItem, rangesTo} from "../../utils/types";

export const registeredBlogs = [
    cppThreadsInstance
]

export const makeBlogRouters = () => {
    return rangesTo(registeredBlogs, (blog) => {
        const blogComponent = () => {
            return (<BlogConstructor item={blog}/>);
        }
        return createRouterItem({
            path: blog.path,
            component: blogComponent
        });
    });
};



export const registeredCareerPositions = [

]


