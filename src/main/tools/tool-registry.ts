import {rangesTo} from "../../common/types";
import muvizInstance from "./muviz/muviz";
import {RouteDefinition} from "../../common/router";
import meshaInstance from "./mesha/mesha";
import trussOptInstance from "./trussopt/trussopt";


export const registeredTools = [
    muvizInstance,
    meshaInstance,
    trussOptInstance,
]

export const makeToolRouter = () => {
    return rangesTo(registeredTools, (info) => {
        return {path: info.path, component: info.component} as RouteDefinition;
    });
};

