import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Type,
  ViewContainerRef
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
  contentComponentRef: ComponentRef<any>;
  dialogComponentRef: ComponentRef<DialogComponent>;
  close: () => any;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogs: Map<DialogConfiguration, DialogRef> = new Map();
  private dialogOrder: DialogRef[] = [];

  private viewContainerRef?: ViewContainerRef;

  constructor(
      private readonly componentFactoryResolver: ComponentFactoryResolver,
      private readonly injector: Injector,
      private readonly appRef: ApplicationRef
  ) {
  }

  public registerContainer(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  public toggle(dialogConfiguration: DialogConfiguration) {
    if (this.dialogs.has(dialogConfiguration)) {
      this.close(dialogConfiguration);
    } else {
      this.open(dialogConfiguration);
    }
  }

  public open(dialogConfiguration: DialogConfiguration): DialogRef | undefined {
    if (!this.viewContainerRef || this.dialogs.has(dialogConfiguration)) {
      return;
    }

    const contentComponentFactory = this.componentFactoryResolver.resolveComponentFactory(dialogConfiguration.content);
    const dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent)

    const dialogComponentRef = this.viewContainerRef.createComponent(dialogComponentFactory);

    const contentComponentRef = dialogComponentRef.instance.contentHost.viewContainerRef.createComponent(contentComponentFactory);
    dialogComponentRef.instance.dialogTitle = dialogConfiguration.title;
    dialogComponentRef.instance.dialogRef = {
      dialogComponentRef,
      contentComponentRef,
      close: () => this.close(dialogConfiguration)
    };
    dialogComponentRef.instance.closeDialog.pipe(take(1))
        .subscribe(() => this.close(dialogConfiguration))

    this.dialogs.set(dialogConfiguration, dialogComponentRef.instance.dialogRef);
    this.dialogOrder.push(dialogComponentRef.instance.dialogRef);

    this.updateZOrder();

    return dialogComponentRef.instance.dialogRef;
  }

  public close(dialogConfiguration: DialogConfiguration) {
    if (!dialogConfiguration || !this.dialogs.get(dialogConfiguration) || !this.viewContainerRef) {
      return;
    }

    const dialogRef = this.dialogs.get(dialogConfiguration) as DialogRef;
    dialogRef.contentComponentRef.destroy();
    dialogRef.dialogComponentRef.destroy();
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
