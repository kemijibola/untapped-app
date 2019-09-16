import {
  Component,
  OnInit,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';
import { Store, select } from '@ngrx/store';
// import { ModalService } from 'src/app/services/modal.service';
import { AbstractUploadComponent } from 'src/app/shared/Classes/abstract/abstract-upload/abstract-upload.component';
import {
  IFileInputModel,
  UPLOADOPERATIONS,
  CloudUploadParams,
  SignedUrl,
  PortfolioUploadInputConfig,
  MediaAcceptType
} from 'src/app/interfaces';
import * as fromApp from '../../../store/app.reducers';
import * as UploadActions from '../../../shared/store/upload/upload.actions';
import { selectPresignedUrls } from '../../../shared/store/upload/upload.selectors';

@Component({
  selector: 'app-portfolio-upload',
  templateUrl: './portfolio-upload.component.html',
  styleUrls: ['./portfolio-upload.component.css']
})
export class PortfolioUploadComponent extends AbstractUploadComponent {
  fileConfig: IFileInputModel;
  uploadOperation = UPLOADOPERATIONS.Portfolio;
  uploadedMedia: string[] = [];
  @Input() fileInputConfig: PortfolioUploadInputConfig;
  constructor(public store: Store<fromApp.AppState>) {
    super();
  }
  setUploadedImage(): void {}

  uploadFiles(files: File[]): void {
    // TODO:: once upload is successful, push uploaded
    // urls to array

    this.store.pipe(select(selectPresignedUrls)).subscribe((val: SignedUrl) => {
      if (val.action === this.uploadOperation) {
        for (const item of val.presignedUrl) {
          const file = files.filter(x => x.name === item.file)[0];
          const uploadParams: CloudUploadParams = {
            file: file,
            url: item.url
          };

          this.store.dispatch(
            new UploadActions.UploadFiles({ cloudParams: uploadParams })
          );

          this.uploadedMedia = [...this.uploadedMedia, item.key];
        }
      }
    });
  }

  // Determine if its multiple/single upload by using
  onClickPortfolioUploadBtn() {
    this.fileConfig = {
      state: true,
      process: this.uploadOperation,
      multiple: this.fileInputConfig.isMultiple,
      accept: this.fileInputConfig.mediaAccept
    };
  }
}
