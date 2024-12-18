import {rangesTo} from "../../common/math";
import muvizInstance from "./muviz/muviz";
import {RouteDefinition} from "../../common/router";
import meshaInstance from "./mesha/mesha";
import trussOptInstance from "./trussopt/trussopt";


export const registeredTools = [
    meshaInstance,
    trussOptInstance,
    muvizInstance,
]

export const makeToolRouter = () => {
    return rangesTo(registeredTools, (info) => {
        return {
            path: info.path,
            component: info.component
        } as RouteDefinition;
    });
};

