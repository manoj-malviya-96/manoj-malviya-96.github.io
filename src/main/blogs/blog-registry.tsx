import BlogConstructor from "./blog-constructor";
import {rangesTo} from "../../common/types";
import cppThreadsInstance from "./cpp-threads/cpp-threads";
import {RouteDefinition} from "../../common/router";
import deltaDesignInstance from "./delta-design/delta-design";
import rapidToptInstance from "./rapid-topt/rapid-topt";

export const registeredBlogs = [
    cppThreadsInstance,
    deltaDesignInstance,
    rapidToptInstance,
]

export const jobRelatedBlogs = []

export const makeBlogRouters = () => {
    return rangesTo(registeredBlogs.concat(jobRelatedBlogs), (blog) => {
        const blogComponent = () => {
            return (
                <BlogConstructor item={blog}/>
            );
        }
        return {
            path: blog.path,
            component: blogComponent
        } as RouteDefinition;
    });
};
