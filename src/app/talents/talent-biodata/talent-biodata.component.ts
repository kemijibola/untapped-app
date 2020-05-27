import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { UserFilterCategory } from "src/app/interfaces";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import * as fromTalentFilter from "src/app/shared/store/filtered-categories/talent-category.reducers";

@Component({
  selector: "app-talent-biodata",
  templateUrl: "./talent-biodata.component.html",
  styleUrls: ["./talent-biodata.component.css"],
})
export class TalentBiodataComponent implements OnInit {
  selectedUser: UserFilterCategory;
  defaultImage: string = "";
  defaultParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 70,
        height: 70,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 442,
        height: 293,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.store
      .pipe(select(fromTalentFilter.selectCurrentTalentWithHighestComment))
      .subscribe((val: UserFilterCategory) => {
        if (val) {
          this.selectedUser = { ...val };
          this.defaultImage = fetchImageObjectFromCloudFormation(
            val.displayPhoto,
            this.defaultParams
          );
          this.selectedUser.displayPhotoFullPath = fetchImageObjectFromCloudFormation(
            val.displayPhoto,
            this.editParams
          );
        }
      });
  }
}
