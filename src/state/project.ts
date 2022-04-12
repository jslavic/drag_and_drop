import { Project } from "../models/project";
import { ProjectStatus } from "../models/project";

type Listener<T> = (items: T[]) => void;

class State<T> {
  private listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }

  notifySubscribers(callback: (item: Listener<T>) => void) {
    this.listeners.forEach(callback);
  }
}

export class ProjectState extends State<Project> {
  protected projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new ProjectState());
  }

  addProject(title: string, description: string, peopleAmount: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      peopleAmount,
      ProjectStatus.Active
    );
    this.projects.unshift(newProject);

    this.notifySubscribers(this.listenerFunction);
  }

  changeStatusOfProject(id: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === id);
    if (project) project.status = newStatus;

    this.notifySubscribers(this.listenerFunction);
  }

  private listenerFunction = (listener: Listener<Project>) => {
    listener(this.projects.slice());
  };
}
export const projectState = ProjectState.getInstance();
