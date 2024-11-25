import Home from "./home";
import {makeBlogRouters} from "../blogs/blog-registry";
import {makeToolRouter} from "../tools/tool-registry";


const routes = [
    {
        path: "/",
        component: Home,
    }
];
routes.push(...makeBlogRouters())
routes.push(...makeToolRouter())

export default routes;

