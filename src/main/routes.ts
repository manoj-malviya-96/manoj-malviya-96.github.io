import Home from "./home";
import { makeBlogRouters } from "./blogs/blog-registry";
import { makeSecretTools, makeToolRouter } from "./tools/tool-registry";

const constructedRoutes = [
  {
    path: "/",
    component: Home,
  },
];
constructedRoutes.push(...makeBlogRouters());
constructedRoutes.push(...makeToolRouter());
constructedRoutes.push(...makeSecretTools());

export default constructedRoutes;
