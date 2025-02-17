import React from "react";

interface ToolInfoProps {
  id: string;
  name: string;
  description: string;
  cover?: string;
  logo: string;
  componentConstructor(): React.ReactNode;
}

class ToolInfo {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly cover: string | undefined;
  readonly logo: string;
  readonly component: () => React.ReactNode;

  constructor({
    id,
    name,
    description,
    logo,
    cover,
    componentConstructor,
  }: ToolInfoProps) {
    this.name = name;
    this.description = description;
    this.path = "/tools/" + id;
    this.cover = cover;
    this.logo = logo;
    this.component = componentConstructor;
  }
}

export default ToolInfo;
