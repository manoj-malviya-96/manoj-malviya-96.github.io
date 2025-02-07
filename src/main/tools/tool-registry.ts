import { rangesTo } from "../../common/math";
import { RouteDefinition } from "../../providers/router";
import Muviz from "./muviz/muviz";
import TrussOpt from "./trussopt/trussopt";
import Mesha from "./mesha/mesha";
import ToolInfo from "./tool-info";
import Valentine from "./valentine/valentine";

export const registeredTools = [new Muviz(), new TrussOpt(), new Mesha()];

export const makeToolRouter = () => {
  return rangesTo<ToolInfo, RouteDefinition>(registeredTools, (info) => {
    return {
      path: info.path,
      component: info.component,
    } as RouteDefinition;
  });
};

const hiddenTools = [new Valentine()];

export const makeSecretTools = () => {
  return rangesTo<ToolInfo, RouteDefinition>(hiddenTools, (info) => {
    return {
      path: info.path,
      component: info.component,
    } as RouteDefinition;
  });
};
