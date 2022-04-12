import { DraggableItem } from "../models/draggable-item";
import { Component } from "./base-component";
import { Project } from "../models/project";
import { autobind } from "../decorators/autobind";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements DraggableItem
{
  private project: Project;

  get peopleAssigned() {
    return this.project.people === 1
      ? "1 person assigned"
      : `${this.project.people.toString()} people assigned`;
  }

  constructor(parentId: string, project: Project) {
    super("single-project", parentId, "beforeend", project.id);
    this.project = project;

    this.render();
    this.configureListeners();
  }

  render() {
    this.element!.querySelector("h2")!.textContent = this.project.title;
    this.element!.querySelector("h3")!.textContent = this.peopleAssigned;
    this.element!.querySelector("p")!.textContent = this.project.description;
  }

  private configureListeners() {
    this.element!.addEventListener("dragstart", this.dragStartHandler);
    this.element!.addEventListener("dragend", this.dragStartHandler);
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent) {}
}
