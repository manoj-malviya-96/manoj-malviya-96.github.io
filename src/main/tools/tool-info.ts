import React from "react";


interface ToolInfoProps {
    id: string;
    name: string;
    description: string;
    cover: string;
    
    componentConstructor(): React.ReactNode;
}

class ToolInfo {
    private readonly name: string;
    private readonly description: string;
    private readonly path: string;
    private readonly cover: string;
    private readonly component: () => React.ReactNode;
    
    constructor(
        {
            id,
            name,
            description,
            cover,
            componentConstructor
        }: ToolInfoProps) {
        this.name = name;
        this.description = description;
        this.path = '/tools/' + id; // For router path
        this.cover = cover; // For icon
        this.component = componentConstructor;
    }
}

export default ToolInfo;