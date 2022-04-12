import { Component } from "./base-component";
import { projectState } from "../state/project";
import { autobind } from "../decorators/autobind";
import { convertStringToNumber } from "../utils/convertStringToNumber";
import { validate } from "../utils/validation";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputEl?: HTMLInputElement;
  descriptionInputEl?: HTMLInputElement;
  peopleInputEl?: HTMLInputElement;

  constructor() {
    super("project-input", "app", "afterbegin", "user-input");

    // Render the form from the template upon instantiating this class
    this.render();
  }

  render() {
    this.renderFormElements();
    this.configureListeners();
  }

  private renderFormElements() {
    this.titleInputEl = <HTMLInputElement>this.element!.querySelector("#title");
    this.descriptionInputEl = <HTMLInputElement>(
      this.element!.querySelector("#description")
    );
    this.peopleInputEl = <HTMLInputElement>(
      this.element!.querySelector("#people")
    );
  }

  private configureListeners() {
    this.element?.addEventListener("submit", this.submitHandler);
  }

  @autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (!userInput) return;
    const [title, description, peopleAmount] = userInput;
    projectState.addProject(title, description, peopleAmount);
    this.clearInputs();
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputEl!.value;
    const description = this.descriptionInputEl!.value;
    const peopleAmount = convertStringToNumber(this.peopleInputEl!.value);

    if (
      validate(title, { required: true, maxLength: 20 }) &&
      validate(description, { required: true, minLength: 5 }) &&
      validate(peopleAmount, { required: true, min: 1, max: 5 })
    ) {
      return [title, description, peopleAmount];
    } else {
      alert("Invalid input, please try again!");
      return;
    }
  }

  private clearInputs() {
    this.titleInputEl!.value = "";
    this.descriptionInputEl!.value = "";
    this.peopleInputEl!.value = "";
  }
}
