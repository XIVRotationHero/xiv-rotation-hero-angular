import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import {DialogComponent} from "../components/dialog/dialog.component";
import {take} from "rxjs/operators";

export interface DialogConfiguration {
  title: string;
  content: Type<unknown>;
  width?: number;
  height?: number;
}

export interface DialogRef {
  componentRef: ComponentRef<any>;
  dialogComponentRef: ComponentRef<DialogComponent>;
  close: () => any;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogs: Map<DialogConfiguration, DialogRef> = new Map();
  private dialogOrder: DialogRef[] = [];

  private elementRef?: ElementRef;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly injector: Injector,
    private readonly appRef: ApplicationRef
  ) {}

  public registerContainer(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  public toggle(dialogConfiguration: DialogConfiguration) {
    if (this.dialogs.has(dialogConfiguration)) {
      this.close(dialogConfiguration);
    } else {
      this.open(dialogConfiguration);
    }
  }

  public open(dialogConfiguration: DialogConfiguration): DialogRef | undefined {
    if (!this.elementRef || this.dialogs.has(dialogConfiguration)) {
      return;
    }

    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(dialogConfiguration.content)
      .create(this.injector);

    const dialogComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(DialogComponent)
      .create(this.injector, [ [ componentRef.location.nativeElement ] ]);

    const dialogRef: DialogRef = {
      dialogComponentRef,
      componentRef,
      close: () => this.close(dialogConfiguration)
    }

    dialogComponentRef.instance.dialogTitle = dialogConfiguration.title;
    dialogComponentRef.instance.dialogRef = dialogRef;
    dialogComponentRef.instance.closeDialog.pipe(take(1))
      .subscribe(() => this.close(dialogConfiguration))

    this.appRef.attachView(componentRef.hostView);
    this.appRef.attachView(dialogRef.dialogComponentRef.hostView);

    const domElem = (dialogRef.dialogComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this.elementRef.nativeElement.appendChild(domElem);

    this.dialogs.set(dialogConfiguration, dialogRef);

    this.dialogOrder.push(dialogRef);

    this.updateZOrder();

    return dialogRef;
  }

  public close(dialogConfiguration: DialogConfiguration) {
    if (!dialogConfiguration || !this.dialogs.get(dialogConfiguration) || !this.elementRef) {
      return;
    }

    const dialogRef = this.dialogs.get(dialogConfiguration) as DialogRef;

    const domElem = (dialogRef.dialogComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this.elementRef.nativeElement.removeChild(domElem);

    this.appRef.detachView(dialogRef.dialogComponentRef.hostView)
    this.appRef.detachView(dialogRef.componentRef.hostView);

    this.dialogOrder.splice(this.dialogOrder.indexOf(dialogRef), 1);

    this.dialogs.delete(dialogConfiguration);

    this.updateZOrder();
  }

  public moveDialogToFront(dialogRef: DialogRef) {
    this.dialogOrder.splice(this.dialogOrder.indexOf(dialogRef), 1);
    this.dialogOrder.push(dialogRef);
    this.updateZOrder();
  }

  private updateZOrder() {
    const totalDialogs = this.dialogOrder.length;
    this.dialogOrder.forEach((dialogRef, zIndex) => {
      dialogRef.dialogComponentRef.instance.zIndex = zIndex;
      dialogRef.dialogComponentRef.instance.isActive = zIndex === totalDialogs - 1;
    });
  }
}
