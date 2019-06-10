import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromTalent from '../../talent-feature.reducers';
import * as fromShared from '../../../shared/shared.reducers';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileInputModel, FileUploadModel, FileModel, PresignFileModel, FileMetaData } from 'src/app/models/shared/file';
import { UPLOAD_ACTION } from '../../../lib/constants';
import * as UploadActions from '../../../shared/store/upload/upload.actions';


@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit, OnDestroy {
  imagePath = '';
  isDefaultImage = false;
  ngDestroyed = new Subject();
  fileConfig: FileInputModel;
  multiple = '';
  private file: PresignFileModel;
  constructor(
    private store: Store<fromTalent.TalentState>,
    private sharedStore: Store<fromShared.SharedState>
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        select('talent'),
        takeUntil(this.ngDestroyed)
      )
      .subscribe((val: string) => {
      if (!val['image']) {
        this.isDefaultImage = true;
      }
        this.imagePath = val['image'] || 'assets/img/profile/profile-2.png';
      });

      this.sharedStore
        .pipe(
          select('shared'),
          takeUntil(this.ngDestroyed)
        )
        .subscribe(val => {
          if (val['upload']['file']) {
            if (val['upload']['file']['action'] === UPLOAD_ACTION.UPLOAD_PROFILE_IMAGE && val['upload']['file']['files'].length > 0) {
              const files: FileMetaData[] = val['upload']['file']['files'].reduce((arr, file) => {
                  arr.push({
                    file: file['data']['name'],
                    file_type: file['data']['type']
                  });
                  return arr;
              }, []);
              this.file = {
                action: val['upload']['file']['action'],
                files: [...files]
              };
              this.store.dispatch(new UploadActions.GetPresignedUrl({ file: this.file}));
              this.store.dispatch(new UploadActions.ResetFileInput());
            }
          }
        });
      // if file is available, get preSignedUrl
      // to the upload to aws from here
      // do what ever you want to do with the upload process in this component
  }

  onProfileImageBtnClick() {
    // The parent component configures app upload component here
    this.fileConfig = {
      state: true,
      process: UPLOAD_ACTION.UPLOAD_PROFILE_IMAGE,
      multiple: true,
      accept: 'image/*'
    };
    this.sharedStore.dispatch(new UploadActions.FileInputConfig({ fileInput: this.fileConfig }));
  }

  ngOnDestroy() {
    this.ngDestroyed.next();
    this.ngDestroyed.complete();
  }
}
