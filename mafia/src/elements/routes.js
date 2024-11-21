import BlogConstructor from "../blogs/blog-constructor";
import Home from "./home";

const routes = [
    {
        path: "/",
        element: Home,
    },
    {
        path: "/blog/:blogId",
        element: BlogConstructor,
    },
    // {
    //     path: "/apps/:appId",
    //     element: AppP,
    // }
];

export default routes;

