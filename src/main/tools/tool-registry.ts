import {rangesTo} from "../../common/types";
import muvizInstance from "./muviz/muviz";
import {RouteDefinition} from "../../common/router";


export const registeredTools = [
    muvizInstance,
]

export const makeToolRouter = () => {
    return rangesTo(registeredTools, (info) => {
        return {path: info.path, component: info.component} as RouteDefinition;
    });
};

