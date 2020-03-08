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
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-portfolio-upload',
  templateUrl: './portfolio-upload.component.html',
  styleUrls: ['./portfolio-upload.component.css']
})
export class PortfolioUploadComponent  {
  constructor(private modalService: ModalService) {
  }

  openModal(id: string) {
    this.modalService.open(id);
}

}
