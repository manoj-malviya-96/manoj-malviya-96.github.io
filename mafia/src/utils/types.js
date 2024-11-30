import {ButtonOptions} from "./enums";

export function rangesTo(range, toFunc) {
    const result = [];
    for (let i = 0; i < range.length; i++) {
        result.push(toFunc(range[i]));
    }
    return result;
}


// Basically this is the best lightweight way to create a struct in JS with type checking.
export function makeStruct({...props}, typeKey = '') {
    if (typeKey === '') {
        console.error(typeKey);
        throw new Error(typeKey + ' must be a non-empty string');
    }
    return {...props, typeKey: typeKey};
}

export function validateStructType(struct, typeKey) {
    if (struct.typeKey !== typeKey) {
        throw new Error(`Expected ${typeKey} but got ${struct.typeKey}`);
    }
}

export function validateStructTypeForList(listOfStruct, typeKey) {
    listOfStruct.forEach((struct) => validateStructType(struct, typeKey));
}

export function validateClassType(instance, classType) {
    if (!(instance instanceof classType)) {
        throw new Error(`Expected ${classType} but got ${instance.constructor}`);
    }
}

export function createBentoBoxItem({title, description, date, tags, logo, size, hasBorder, isNew, onClickArg}) {
    return makeStruct({title, description, date, tags, logo, size, hasBorder, isNew, onClickArg},
        'BentoBoxItem');
}


export function createTabItem({name, label, icon}) {
    return makeStruct({name, label, icon}, 'TabItem');
}


export function createRouterItem({path, component}) {
    return makeStruct({path, component}, 'RouterItem');
}


export function createGridButtonItem({
                                         label, icon, onClickFunc, size = ButtonOptions.Size.Small,
                                         state = ButtonOptions.State.None,
                                         style = ButtonOptions.Style.Filled,
                                         behavior = ButtonOptions.Behavior.Default,
                                     }) {
    return makeStruct({label, icon, onClickFunc, size, state, style, behavior}, 'GridButtonItem');
}

export function createTimeLineItem({id, title, date, image, link, icon}) {
    return makeStruct({id, title, date, image, link, icon}, 'TimeLineItem');
}


export function createDropdownItem({label, icon, value}) {
    return makeStruct({label, icon, value}, 'DropdownItem');
}