
class ToolInfo {
  constructor({id, name, description, iconPng, componentConstructor}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.path = '/tools/' + this.id; // For router path
    this.icon = iconPng; // For icon
    this.component = componentConstructor;
  }
}

export default ToolInfo;