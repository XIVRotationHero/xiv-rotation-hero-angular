import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild} from '@angular/core';
import {DialogRef, DialogService} from "../../services/dialog.service";
import {DialogContentHostDirective} from "../../directives/dialog-content-host.directive";

@Component({
  selector: 'rh-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() public dialogTitle!: string;
  @Input() public dialogRef!: DialogRef;

  @HostBinding('style.zIndex')
  @Input() public zIndex!: number;

  @HostBinding('class.active')
  @Input() public isActive!: boolean;

  @ViewChild(DialogContentHostDirective, {static: true}) contentHost!: DialogContentHostDirective;

  @Output() public closeDialog: EventEmitter<void> = new EventEmitter();

  public isMinimized = false;

  private lastMousePosition: [number, number] = [0, 0];

  private maxLeft = 0;
  private maxTop = 0;

  public constructor(
      private readonly elementRef: ElementRef,
      private readonly dialogService: DialogService
  ) {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDragStop = this.onMouseDragStop.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
  }

  // Event listeners for drag handling
  public onMouseDragStart(evt: MouseEvent): void {
    if (evt.button !== 0) {
      return;
    }
    evt.preventDefault();

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseDragStop);

    const {width, height} = this.elementRef.nativeElement.getBoundingClientRect();
    this.maxTop = window.innerHeight - height;
    this.maxLeft = window.innerWidth - width;

    this.lastMousePosition = [evt.clientX, evt.clientY];
  }

  public onTouchDragStart(evt: TouchEvent): void {
    document.addEventListener('touchmove', this.onTouchMove, {passive: false});
    document.addEventListener('touchend', this.onMouseDragStop, {passive: false});

    const {width, height} = this.elementRef.nativeElement.getBoundingClientRect();
    this.maxTop = window.innerHeight - height;
    this.maxLeft = window.innerWidth - width;

    this.lastMousePosition = [evt.touches[0].clientX, evt.touches[0].clientY];
  }

  private onMouseMove(evt: MouseEvent): void {
    const {offsetLeft, offsetTop} = this.elementRef.nativeElement;

    // Get difference between last and new position in pixels
    const [oldX, oldY] = this.lastMousePosition;
    const {clientX, clientY} = evt;
    const [diffX, diffY] = [oldX - clientX, oldY - clientY];
    this.lastMousePosition = [clientX, clientY];

    // Set position
    this.updatePosition(offsetLeft - diffX, offsetTop - diffY);
  }

  private onTouchMove(evt: TouchEvent): void {
    evt.preventDefault();

    const {offsetLeft, offsetTop} = this.elementRef.nativeElement;

    // Get difference between last and new position in pixels
    const [oldX, oldY] = this.lastMousePosition;
    const {clientX, clientY} = evt.touches[0];
    const [diffX, diffY] = [oldX - clientX, oldY - clientY];
    this.lastMousePosition = [clientX, clientY];

    // Set position
    this.updatePosition(offsetLeft - diffX, offsetTop - diffY);
  }

  private updatePosition(x: number, y: number) {
    this.elementRef.nativeElement.style.left = Math.min(Math.max(x, 0), this.maxLeft) + 'px';
    this.elementRef.nativeElement.style.top = Math.min(Math.max(y, 0), this.maxTop) + 'px';
  }

  private onMouseDragStop(): void {
    document.removeEventListener('mouseup', this.onMouseDragStop);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchend', this.onMouseDragStop);
    document.removeEventListener('touchmove', this.onTouchMove);
  }

  @HostListener('mousedown')
  private moveDialogToTop() {
    this.dialogService.moveDialogToFront(this.dialogRef);
  }
}
