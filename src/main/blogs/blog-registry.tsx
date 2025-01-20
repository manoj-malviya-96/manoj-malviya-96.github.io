import BlogConstructor from "./blog-constructor";
import {rangesTo} from "../../common/math";
import {RouteDefinition} from "../../providers/router";
import QmlOptimization from "./qml-optimization/qml-opt";
import CppThreads from "./cpp-threads/cpp-threads";
import DeltaDesign from "./delta-design/delta-design";
import RapidTopt from "./rapid-topt/rapid-topt";
import PennStateRD from "./work-exp/penn-state";
import FormlabsSW from "./work-exp/formlabs-software";
import FormlabsRd from "./work-exp/formlabs-rd";
import {BlogInfo} from "./blog-info";

export const registeredBlogs = [
    new QmlOptimization(),
    new CppThreads(),
    new DeltaDesign(),
    new RapidTopt()
]

export const jobRelatedBlogs = [
    new PennStateRD(),
    new FormlabsSW(),
    new FormlabsRd()
]

export const makeBlogRouters = () => {
    return rangesTo<BlogInfo, RouteDefinition>(registeredBlogs.concat(jobRelatedBlogs), (blog) => {
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
