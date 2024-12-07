import cppThreadsInstance from "./cpp-threads/cpp-threads";
import BlogConstructor from "./blog-constructor";
import {createRouterItem, rangesTo} from "../../utils/types";
import buildOrientInstance from "./build-orient/build-orient";
import cubCompanionInstance from "./cub-companion/cub-companion";
import deltaDesignInstance from "./delta-design/delta-design";
import embedAMInstance from "./embed-am/embed-am";
import engDFAMInstance from "./eng-dfam/eng-dfam";
import rapidTOptInstance from "./rapid-topt/rapid-topt";
import pennStateInstance from "./job-related/penn-state/penn-state";
import formlabsRdInstance from "./job-related/formlabs-rd/formlabs-rd";
import formlabsSwInstance from "./job-related/formlabs-software/formlabs-software";

export const registeredBlogs = [
    rapidTOptInstance,
    deltaDesignInstance,
    embedAMInstance,
    engDFAMInstance,
    cppThreadsInstance,
    cubCompanionInstance,
    buildOrientInstance
]

export const jobRelatedBlogs = [
    pennStateInstance,
    formlabsRdInstance,
    formlabsSwInstance
]

export const makeBlogRouters = () => {
    return rangesTo(registeredBlogs.concat(jobRelatedBlogs), (blog) => {
        const blogComponent = () => {
            return (<BlogConstructor item={blog}/>);
        }
        return createRouterItem({
            path: blog.path,
            component: blogComponent
        });
    });
};
