export function removeChildNodes(node: HTMLElement) {
  /**
   * An alternative to this function would be to set the innerr html or text
   * content of the node to an empty string, however might not be suitable
   * for the highest-performance because it invokes the browser's HTML parser.
   * Source : https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
   */

  while (node.firstChild) {
    node.removeChild(node.lastChild!);
  }
}
