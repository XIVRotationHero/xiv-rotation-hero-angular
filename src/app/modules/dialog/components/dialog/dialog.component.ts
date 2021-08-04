import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'rh-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() public dialogTitle?: string;

  @Output() public closeDialog: EventEmitter<void> = new EventEmitter();

  private lastMousePosition: [number, number] = [0, 0];

  public constructor(private readonly elementRef: ElementRef) {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDragStop = this.onMouseDragStop.bind(this);
  }

  // Event listeners for drag handling
  public onMouseDragStart(evt: MouseEvent): void {
    if (evt.button !== 0) {
      return;
    }

    evt.preventDefault();

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseDragStop);

    this.lastMousePosition = [ evt.clientX, evt.clientY ];
  }

  private onMouseMove(evt: MouseEvent): void {
    evt.preventDefault();

    const { offsetLeft, offsetTop } = this.elementRef.nativeElement;

    // Get difference between last and new position in pixels
    const [ oldX, oldY ] = this.lastMousePosition;
    const { clientX, clientY } = evt;
    const [ diffX, diffY ] = [ oldX - clientX, oldY - clientY ];
    this.lastMousePosition = [ clientX, clientY ];

    // Set position
    this.updatePosition(offsetLeft - diffX, offsetTop - diffY);
  }

  private updatePosition(x: number, y: number) {
    this.elementRef.nativeElement.style.left = Math.max(x, 0) + 'px';
    this.elementRef.nativeElement.style.top = Math.max(y, 0) + 'px';
  }

  private onMouseDragStop(): void {
    document.removeEventListener('mouseup', this.onMouseDragStop);
    document.removeEventListener('mousemove', this.onMouseMove);
  }
}
