import BlogConstructor from "../blogs/blog-template";
import Home from "./home";
import BlogTemplate from "../blogs/blog-template";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/blog/template",
        component: BlogTemplate,
    },
    // {
    //     path: "/apps/:appId",
    //     element: AppP,
    // }
];

export default routes;

