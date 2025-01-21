import Home from "./home";
import { makeBlogRouters } from "./blogs/blog-registry";
import { makeToolRouter } from "./tools/tool-registry";

const constructedRoutes = [
  {
    path: "/",
    component: Home,
  },
];
constructedRoutes.push(...makeBlogRouters());
constructedRoutes.push(...makeToolRouter());

export default constructedRoutes;
