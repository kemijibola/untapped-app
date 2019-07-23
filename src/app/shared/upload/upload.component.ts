import {
  Component,
  OnInit,
  Input,
  ElementRef,
  HostListener,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromShared from '../../shared/shared.reducers';
import * as fromApp from '../../store/app.reducers';
import { Subject } from 'rxjs';
import * as UploadActions from '../store/upload/upload.actions';
import { takeUntil } from 'rxjs/operators';
import {
  IFileInputModel,
  IFileUploadModel,
  IFileModel
} from 'src/app/interfaces';
import { selectUploadActionState } from '../../shared/store/upload/upload.selectors';

const noop = () => {};

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadComponent,
      multi: true
    }
  ]
})
export class UploadComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  private file: IFileModel;
  ngDestroyed = new Subject();
  multiple: boolean;
  accept: string;
  operationType: string;
  state: boolean;
  private onChange: Function;
  private onTouchedCallback: Function;
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private store: Store<fromApp.AppState>
  ) {
    this.onTouchedCallback = noop;
    this.onChange = noop;
  }

  ngOnInit() {
    const config$ = this.store.pipe(select(selectUploadActionState));
    config$.subscribe(val => {
      console.log(val);
    });
    // this.store
    //   .pipe(
    //     select('shared'),
    //     takeUntil(this.ngDestroyed)
    //   )
    //   .subscribe(val => {
    //     console.log(val);
    //   });
    // this.store
    //   .pipe(
    //     select('shared'),
    //     takeUntil(this.ngDestroyed)
    //   )
    //   .subscribe((val: IFileInputModel) => {
    //     if (val.state) {
    //       this.multiple = val.multiple;
    //       this.operationType = val.process;
    //       this.state = val.state;
    //       this.accept = val.accept;
    //       if (this.state) {
    //         this.triggerFileInput();
    //       }
    //     }
    //     // if (val['upload']['fileInput']['state']) {
    //     //   this.multiple = val['upload']['fileInput']['multiple'];
    //     //   this.accept = val['upload']['fileInput']['accept'];
    //     //   this.operationType = val['upload']['fileInput']['process'];
    //     //   this.state = val['upload']['fileInput']['process'];
    //     //   if (this.state) {
    //     //     this.triggerFileInput();
    //     //   }
    //     // }
    //   });
  }

  private triggerFileInput(): void {
    this.fileInput.nativeElement.multiple = this.multiple;
    this.fileInput.nativeElement.accept = this.accept;
    this.fileInput.nativeElement.click();
  }

  @HostListener('change', ['$event.target.files']) emitFiles(files: FileList) {
    const fileArray = [];
    for (let index = 0; index < files.length; index++) {
      const fileToUpload = files[index];
      fileArray.push({
        data: fileToUpload
      });
    }
    this.file = {
      action: this.operationType,
      files: [...fileArray]
    };
    this.onChange(this.file);
    this.store.dispatch(new UploadActions.FileToUpload(this.file));
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '' || value;
    this.file.files = [];
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedCallback = fn;
  }

  ngOnDestroy() {
    this.store.dispatch(new UploadActions.ResetFileInput());
    this.ngDestroyed.next();
    this.ngDestroyed.complete();
  }
}
