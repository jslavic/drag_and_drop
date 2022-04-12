export interface DraggableItem {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}
