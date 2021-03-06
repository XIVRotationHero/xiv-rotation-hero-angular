import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  SimpleChanges
} from '@angular/core';
import {HotbarOptions} from "../../interfaces/hotbar-options";
import {HotbarStyle} from "../../enums/hotbar-style.enum";
import {HotbarDisplaySettings} from "../../../configuration/interfaces/hotbar-display-settings";

@Component({
  selector: 'rh-hotbar',
  templateUrl: './hotbar.component.html',
  styleUrls: ['./hotbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotbarComponent {

  @Input() public hotbarId: number = -1;

  @Input() public displayedHotbarId: number | null = null;

  @HostBinding('class.is-visible')
  @Input() public isVisible: boolean = false;

  @Input() public hotbarStyle: HotbarStyle = HotbarStyle.Horizontal;

  @Input() public hotbarDisplaySettings!: HotbarDisplaySettings | null;

  @Input()
  public set position(position: [number, number]) {
    [this.positionX, this.positionY] = position;
    this.elementRef.nativeElement.style.left = this.position[0] * 100 + '%';
    this.elementRef.nativeElement.style.top = this.position[1] * 100 + '%';
  }

  public get position() {
    return [this.positionX, this.positionY];
  }

  // @HostBinding('style.zoom')
  @Input() public scale: number = 1;

  @Input() public options?: HotbarOptions;

  @Input() public allocation: any[] = [null, null, null, null, null, null, null, null, null, null, null, null];

  @Output() public onCycle: EventEmitter<number> = new EventEmitter();
  @Output() public changePosition: EventEmitter<[number, number]> = new EventEmitter();
  @Output() public allocateAction: EventEmitter<{ hotbarId: number, slotId: number, actionId: number }> = new EventEmitter();

  private positionX: number = 0;
  private positionY: number = 0;
  private lastMousePosition: [number, number] = [0, 0];

  @HostBinding('class')
  private hotbarStyleClass: string = '';

  public constructor(
      private readonly elementRef: ElementRef
  ) {
    this.onDragStop = this.onDragStop.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.hotbarStyle?.currentValue) {
      this.hotbarStyleClass = `hotbar-style--${this.hotbarStyle}`;
    }
  }

  public onMouseDragStart(evt: MouseEvent) {
    if (evt.button !== 0 || !this.hotbarDisplaySettings?.enableDragDropRepositioning) {
      return;
    }
    evt.preventDefault();

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onDragStop);

    this.lastMousePosition = [evt.clientX, evt.clientY];
  }

  public onTouchStart(evt: TouchEvent) {
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onDragStop);

    this.lastMousePosition = [evt.touches[0].clientX, evt.touches[0].clientY];
  }

  public onMouseMove(evt: MouseEvent) {
    evt.preventDefault();
    const width = evt.view ? evt.view.innerWidth : 0;
    const height = evt.view ? evt.view.innerHeight : 0;

    const [currentX, currentY] = this.position;
    const [realX, realY] = [currentX * width, currentY * height];

    // Get difference between last and new position in pixels
    const [oldX, oldY] = this.lastMousePosition;
    const {clientX, clientY} = evt;
    const [diffX, diffY] = [oldX - clientX, oldY - clientY];
    this.lastMousePosition = [clientX, clientY];

    // convert to percentage
    this.position = [Math.max((realX - diffX) / width, 0), Math.max((realY - diffY) / height, 0)];
  }

  public onTouchMove(evt: TouchEvent) {
    const width = evt.view ? evt.view.innerWidth : 0;
    const height = evt.view ? evt.view.innerHeight : 0;

    const [currentX, currentY] = this.position;
    const [realX, realY] = [currentX * width, currentY * height];

    // Get difference between last and new position in pixels
    const [oldX, oldY] = this.lastMousePosition;
    const {clientX, clientY} = evt.touches[0];
    const [diffX, diffY] = [oldX - clientX, oldY - clientY];
    this.lastMousePosition = [clientX, clientY];

    // convert to percentage
    this.position = [Math.max((realX - diffX) / width, 0), Math.max((realY - diffY) / height, 0)];
  }

  public slotId(index: number) {
    return index;
  }

  private onDragStop() {
    document.removeEventListener('mouseup', this.onDragStop);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchend', this.onDragStop);
    document.removeEventListener('touchmove', this.onTouchMove);

    this.changePosition.emit(this.position);
  }

}
