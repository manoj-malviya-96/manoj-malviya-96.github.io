
class ToolInfo {
  constructor({id, name, description, cover, componentConstructor}) {
    this.name = name;
    this.description = description;
    this.path = '/tools/' + id; // For router path
    this.logo = cover; // For icon
    this.component = componentConstructor;
  }
}

export default ToolInfo;