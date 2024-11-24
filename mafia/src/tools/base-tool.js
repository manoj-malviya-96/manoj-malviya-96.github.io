
class BaseTool {
  constructor({id, name, description, icon_png}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.path = '/tools/' + this.id;
    this.icon = icon_png;
  }

  execute() {
    console.log('Base tool executed');
  }
}