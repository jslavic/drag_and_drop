type InsertLocationTypes =
  | "afterbegin"
  | "afterend"
  | "beforebegin"
  | "beforeend";

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  parentEl: T;
  element?: U;

  constructor(
    templateId: string,
    parentElementId: string,
    insertLocation: InsertLocationTypes,
    newElementId?: string
  ) {
    // Template that holds project input content
    this.templateEl = <HTMLTemplateElement>document.getElementById(templateId);

    // A reference to where we want to actually render project input
    this.parentEl = <T>document.getElementById(parentElementId);

    this.getElementsFromTemplate(newElementId);
    this.insertTemplateToParentEl(insertLocation);
  }

  private getElementsFromTemplate(newElementId?: string) {
    const templateElFragment = document.importNode(
      this.templateEl.content,
      true
    );

    // Get the form from the template
    this.element = <U>templateElFragment.firstElementChild;
    if (newElementId) this.element.id = newElementId; // to add styling
  }

  private insertTemplateToParentEl(insertLocation: InsertLocationTypes) {
    this.parentEl.insertAdjacentElement(insertLocation, this.element!);
  }

  abstract render(): void;
}
