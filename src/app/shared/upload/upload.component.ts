import { Component, OnInit,
  Input, ElementRef, HostListener, OnChanges, SimpleChanges, ViewChild, OnDestroy, Directive, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromShared from '../../shared/shared.reducers';
import { Subject } from 'rxjs';
import * as UploadActions from '../store/upload/upload.actions';
import { takeUntil } from 'rxjs/operators';
import { FileInputModel, FileUploadModel, FileModel } from 'src/app/models/shared/file';
import { ALLOW_MULTIPLE_PLATFORMS } from '@angular/core/src/application_ref';

const noop = () => {
};

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
export class UploadComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private file: FileModel;
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
    private store: Store<fromShared.SharedState>
    ) {
      this.onTouchedCallback = noop;
      this.onChange = noop;
    }

  ngOnInit() {
    this.store
      .pipe(
        select('shared'),
        takeUntil(this.ngDestroyed)
      )
      .subscribe(val => {
          if (val['upload']['fileInput']['state']) {
            this.multiple = val['upload']['fileInput']['multiple'];
            this.accept = val['upload']['fileInput']['accept'];
            this.operationType = val['upload']['fileInput']['process'];
            this.state = val['upload']['fileInput']['process'];
            if (this.state) {
              this.triggerFileInput();
            }
          }
      });
  }

  private triggerFileInput() {
    this.fileInput.nativeElement.multiple = this.multiple;
    this.fileInput.nativeElement.accept = this.accept;
    this.fileInput.nativeElement.click();
  }

  @HostListener('change', ['$event.target.files']) emitFiles(files: FileList ) {
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
    this.store.dispatch(new UploadActions.FileToUpload({ file: this.file }));
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '' || value;
    this.file.files = [];
  }

  registerOnChange(fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
    this.onTouchedCallback = fn;
  }

  ngOnDestroy() {
   this.store.dispatch(new UploadActions.ResetFileInput());
    this.ngDestroyed.next();
    this.ngDestroyed.complete();
  }
}
