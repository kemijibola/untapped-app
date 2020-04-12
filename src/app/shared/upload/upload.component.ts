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
} from "src/app/interfaces";

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
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  @Input() fileConfig: IFileInputModel;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private store: Store<fromApp.AppState>,
    private renderer: Renderer2
  ) {}
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
    // let child;
    const fileUpload = this.fileInput.nativeElement;
    // const event = new MouseEvent("click", { bubbles: true });
    this.renderer.setProperty(fileUpload, "multiple", this.multiple);
    this.renderer.setProperty(fileUpload, "accept", this.accept);
    fileUpload.click();
    // this.fileInput.nativeElement.dispatchEvent(event);
  }

  @HostListener("change", ["$event.target.files"]) emitFiles(files: FileList) {
    const fileArray = [];
    for (let index = 0; index < files.length; index++) {
      const fileToUpload = files[index];
      fileArray.push({
        data: fileToUpload,
      });
    }
    this.file = {
      action: this.operationType,
      files: [...fileArray],
    };
    // this.onChange(this.file);
    this.store.dispatch(new UploadActions.FileToUpload({ file: this.file }));

    this.writeValue(null);
  }

  writeValue(value: null) {
    // clear file input
    this.fileInput.nativeElement.value = "" || value;
  }

  registerOnChange(fn: Function) {
    // this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    // this.onTouchedCallback = fn;
  }
}
