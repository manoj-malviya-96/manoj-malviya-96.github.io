import {rangesTo} from "../../common/math";
import muvizInstance from "./muviz/muviz";
import {RouteDefinition} from "../../providers/router";
import meshaInstance from "./mesha/mesha";
import trussOptInstance from "./trussopt/trussopt";
import nestorInstance from "./nestor/nestor";


export const registeredTools = [
    meshaInstance,
    trussOptInstance,
    muvizInstance,
    nestorInstance
]

export const makeToolRouter = () => {
    return rangesTo(registeredTools, (info) => {
        return {
            path: info.path,
            component: info.component
        } as RouteDefinition;
    });
};

