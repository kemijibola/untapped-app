import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { selectSelectedUser } from "src/app/shared/store/filtered-categories/user-category.selectors";
import { UserFilterCategory } from "src/app/interfaces";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";

@Component({
  selector: "app-talent-biodata",
  templateUrl: "./talent-biodata.component.html",
  styleUrls: ["./talent-biodata.component.css"]
})
export class TalentBiodataComponent implements OnInit {
  selectedUser: UserFilterCategory;
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 437.66,
        height: 416.16,
        fit: ImageFit.fill
      },
      grayscale: false
    }
  };

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .pipe(select(selectSelectedUser))
      .subscribe((val: UserFilterCategory) => {
        this.selectedUser = { ...val };
        this.selectedUser.displayPhotoFullPath = fetchImageObjectFromCloudFormation(
          val.displayPhoto,
          this.editParams
        );
      });
  }
}
