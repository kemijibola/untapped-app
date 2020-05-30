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
import { Subject, Observable, fromEvent, forkJoin } from "rxjs";
import * as UploadActions from "../store/upload/upload.actions";
import {
  IFileInputModel,
  IFileModel,
  AppNotificationKey,
  ISize,
  MediaAcceptType,
  UPLOADCOMPONENT,
  UPLOADACTION,
  IPresignRequest,
} from "src/app/interfaces";
import * as NotificationActions from "../../store/global/notification/notification.action";
import { map } from "rxjs/operators";
import { getDate } from "date-fns";
import { getMetadata, getThumbnails } from "video-metadata-thumbnails";

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
  ngDestroyed = new Subject();
  multiple: boolean;
  accept: string;
  operationType: UPLOADACTION;
  state: boolean;
  private onChange: Function;
  private onTouchedCallback: Function;
  private file: IFileModel;
  private thumbnailFile: IPresignRequest;

  fileArray = [];
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  @Input() fileConfig: IFileInputModel;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private store: Store<fromApp.AppState>,
    private renderer: Renderer2
  ) {
    this.onTouchedCallback = noop;
    this.onChange = noop;

    this.store.dispatch(new UploadActions.ResetFileInput());
  }
  ngOnInit() {}

  ngOnChanges(simple: SimpleChanges) {
    if (simple["fileConfig"]) {
      if (this.fileConfig) {
        if (this.fileConfig.action !== UPLOADACTION.default) {
          this.multiple = this.fileConfig.multiple;
          this.operationType = this.fileConfig.action;
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

  async onInputChanged(data: any) {
    const fileList: FileList = data.target.files;
    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      if (this.fileConfig.accept === MediaAcceptType.IMAGE) {
        const URL = window.URL || window.webkitURL;
        const imageSrc = URL.createObjectURL(file);
        const fileDimension = await this.getImageSize(imageSrc);
        if (this.validateImageDimension(fileDimension)) {
          this.fileArray.push({ data: file });
        }
      } else {
        if (this.fileConfig.accept === MediaAcceptType.VIDEO && index === 0) {
          const base64 = await this.getBase64(file);
          var videoBlob = this.dataURItoBlob(base64);
          const thumbnails = await getThumbnails(videoBlob, {
            start: 0,
            end: 1,
            quality: 0.7,
            interval: 1,
            scale: 0.7,
          });

          const imageFile = new File([thumbnails[0].blob], "thumbnail.jpeg", {
            type: "image/jpeg",
          });
          const mediaThumbnail: IFileModel = {
            action: UPLOADACTION.uploadthumbnail,
            files: [imageFile],
          };
          this.store.dispatch(
            new UploadActions.SetMediaThumbnail({ thumbnail: mediaThumbnail })
          );
        }
        this.fileArray.push({
          data: file,
        });
      }
    }
    this.file = {
      action: this.operationType,
      files: [...this.fileArray],
    };

    if (this.file.files.length === fileList.length) {
      this.onChange(this.file);
      this.store.dispatch(new UploadActions.FileToUpload({ file: this.file }));
      this.writeValue(null);
    } else {
      //  CHANGE TO HIEHGT AND WIDTH
      this.store.dispatch(
        new NotificationActions.AddError({
          key: AppNotificationKey.error,
          message: `Upload image with minimum dimensions ${this.fileConfig.minHeight}px x ${this.fileConfig.minWidth}px`,
          code: 400,
        })
      );
    }
  }

  getBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = window.atob(dataURI.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "image/png" });
    return blob;
  }

  validateImageDimension(size: ISize): boolean {
    if (
      this.fileConfig.minWidth > size.width ||
      this.fileConfig.minHeight > size.height
    )
      return false;
    return true;
  }

  getImageSize(imageSrc: string): Promise<ISize> {
    return new Promise((resolve, reject) => {
      let mapLoadedImage = (event: any): ISize => {
        return {
          width: event.target.width,
          height: event.target.height,
        };
      };
      var image = new Image();
      fromEvent(image, "load")
        .take(1)
        .pipe(map(mapLoadedImage))
        .subscribe((val: ISize) => {
          resolve(val);
        });
      image.src = imageSrc;
    });
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
}
