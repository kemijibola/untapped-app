import {
  Component,
  OnInit,
  Input,
  ElementRef,
  HostListener,
  ViewChild,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Renderer2,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { Subject } from "rxjs";
import * as UploadActions from "../store/upload/upload.actions";
import {
  IFileInputModel,
  IFileModel,
  UPLOADOPERATIONS,
  AppNotificationKey,
} from "src/app/interfaces";
import * as NotificationActions from "../../store/global/notification/notification.action";

const noop = () => {};

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadComponent,
      multi: true,
    },
  ],
})
export class UploadComponent
  implements ControlValueAccessor, OnInit, OnChanges {
  private file: IFileModel;
  ngDestroyed = new Subject();
  multiple: boolean;
  accept: string;
  operationType: UPLOADOPERATIONS;
  state: boolean;
  private onChange: Function;
  private onTouchedCallback: Function;
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  @Input() fileConfig: IFileInputModel;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private store: Store<fromApp.AppState>,
    private renderer: Renderer2
  ) {
    this.onTouchedCallback = noop;
    this.onChange = noop;
  }
  ngOnInit() {}

  ngOnChanges(simple: SimpleChanges) {
    if (simple["fileConfig"]) {
      if (this.fileConfig) {
        if (this.fileConfig.process !== UPLOADOPERATIONS.Default) {
          this.multiple = this.fileConfig.multiple;
          this.operationType = this.fileConfig.process;
          this.state = this.fileConfig.state;
          this.accept = this.fileConfig.accept;
          if (this.state) {
            this.triggerFileInput();
          }
        }
      }
    }
  }
  private triggerFileInput(): void {
    const fileUpload = this.fileInput.nativeElement;
    this.renderer.setProperty(fileUpload, "multiple", this.multiple);
    this.renderer.setProperty(fileUpload, "accept", this.accept);
    fileUpload.click();
  }

  @HostListener("change", ["$event.target.files"]) emitFiles(files: FileList) {
    const fileArray = [];
    for (let index = 0; index < files.length; index++) {
      var image = new Image();
      const fileToUpload = files[index];
      console.log(this.validateImageSize(fileToUpload));
      // if (this.validateImageSize(fileToUpload)) {
      //   console.log("proceeded");
      //   fileArray.push({
      //     data: fileToUpload,
      //   });
      // }
    }
    this.file = {
      action: this.operationType,
      files: [...fileArray],
    };
    if (this.file.files.length === files.length) {
      console.log("about to upload file");
      this.onChange(this.file);
      // this.store.dispatch(new UploadActions.FileToUpload({ file: this.file }));
      this.writeValue(null);
    }
  }

  writeValue(value: null) {
    // clear file input
    this.fileInput.nativeElement.value = "" || value;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedCallback = fn;
  }

  validateImageSize(file: File): boolean {
    let canProceed = true;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();

    Img.src = URL.createObjectURL(file);

    Img.onload = (e: any) => {
      const height = e.path[0].height;
      const width = e.path[0].width;
      // console.log(height, width);
      if (height < this.fileConfig.minHeight) {
        canProceed = false;
        // this.store.dispatch(
        //   new NotificationActions.AddError({
        //     key: AppNotificationKey.error,
        //     message: `Please upload an image of size ${this.fileConfig.minWidth}px by ${this.fileConfig.minHeight}px`,
        //     code: 400,
        //   })
        // );
      }
      if (width < this.fileConfig.minWidth) {
        canProceed = false;
        // this.store.dispatch(
        //   new NotificationActions.AddError({
        //     key: AppNotificationKey.error,
        //     message: `Please upload an image of size ${this.fileConfig.minWidth}px by ${this.fileConfig.minHeight}px`,
        //     code: 400,
        //   })
        // );
      }
    };
    console.log(canProceed);
    return canProceed;
  }
}
