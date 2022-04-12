import { DragItemTarget } from "../models/drag-item-target";
import { Component } from "./base-component";
import { Project, ProjectStatus } from "../models/project";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project";
import { removeChildNodes } from "../utils/removeChildNodes";
import { ProjectItem } from "./project-item";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragItemTarget
{
  assignedProjects: Project[] = [];

  constructor(private type: ProjectStatus) {
    super("project-list", "app", "beforeend", `${type}-projects`);

    this.render();
    this.configureListeners();
  }

  render() {
    const listId = `${this.type}-projects-list`;
    this.element!.querySelector("ul")!.id = listId;
    this.element!.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private configureListeners() {
    this.element!.addEventListener("dragover", this.dragOverHandler);
    this.element!.addEventListener("dragleave", this.dragLeaveHandler);
    this.element!.addEventListener("drop", this.dropHandler);
    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter(
        (project) => project.status === this.type
      );
      this.renderProjects();
    });
  }

  private renderProjects() {
    const listEl = <HTMLUListElement>(
      document.getElementById(`${this.type}-projects-list`)
    );
    removeChildNodes(listEl);
    this.assignedProjects.forEach((project) => {
      new ProjectItem(`${this.type}-projects-list`, project);
    });
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault(); // in order to allow dropping of the element
      const listEl = this.element!.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      const projectId = event.dataTransfer!.getData("text/plain");
      projectState.changeStatusOfProject(projectId, this.type);
      const listEl = this.element!.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }
  }

  @autobind
  dragLeaveHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      const listEl = this.element!.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }
  }
}
