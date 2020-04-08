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
import * as fromUpload from "../../shared/store/upload/upload.reducers";

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
  @ViewChild("fileInput") fileInput: ElementRef<HTMLInputElement>;
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
    let child;
    child = this.fileInput.nativeElement;
    const event = new MouseEvent("click", { bubbles: true });
    this.renderer.setProperty(child, "multiple", this.multiple);
    this.renderer.setProperty(child, "accept", this.accept);
    this.fileInput.nativeElement.dispatchEvent(event);
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
    this.onChange(this.file);
    this.store.dispatch(new UploadActions.FileToUpload({ file: this.file }));
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = "" || value;
    this.file.files = [];
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedCallback = fn;
  }
}
