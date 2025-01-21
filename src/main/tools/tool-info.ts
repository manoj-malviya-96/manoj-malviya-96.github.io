import React from "react";

interface ToolInfoProps {
  id: string;
  name: string;
  description: string;
  cover: string;

  componentConstructor(): React.ReactNode;
}

class ToolInfo {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly cover: string;
  readonly component: () => React.ReactNode;

  constructor({
    id,
    name,
    description,
    cover,
    componentConstructor,
  }: ToolInfoProps) {
    this.name = name;
    this.description = description;
    this.path = "/tools/" + id;
    this.cover = cover;
    this.component = componentConstructor;
  }
}

export default ToolInfo;
