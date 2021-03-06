import { Component, OnInit } from "@angular/core";
import { AbstractUploadComponent } from "src/app/shared/Classes/abstract/abstract-upload/abstract-upload.component";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { Observable } from "rxjs";
import { IFileInputModel } from "src/app/interfaces";

@Component({
  selector: "app-new-contest-banner",
  templateUrl: "./new-contest-banner.component.html",
  styleUrls: ["./new-contest-banner.component.css"],
})
export class NewContestBannerComponent extends AbstractUploadComponent {
  imagePath: string;
  isDefault: boolean;
  fileConfig: IFileInputModel;
  constructor(public store: Store<fromApp.AppState>) {
    super();
  }

  setUploadedImage(): void {}

  uploadFiles(files: File[]): void {}

  onClickUploadImageBtn() {
    // this.fileConfig = {
    //   state: true,
    //   process: this.uploadOperation,
    //   multiple: false,
    //   accept: "image/*",
    //   minWidth: 200,
    //   minHeight: 200,
    // };
  }
}
