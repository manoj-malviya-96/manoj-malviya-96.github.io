import Home from "./home";
import {makeBlogRouters} from "../blogs/blog-registry";


const routes = [
    {
        path: "/",
        component: Home,
    }
];
routes.push(...makeBlogRouters())

export default routes;

