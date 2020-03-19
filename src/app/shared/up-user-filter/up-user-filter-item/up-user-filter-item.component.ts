import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { UserFilterCategory } from "src/app/interfaces";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import * as fromApp from "../../../store/app.reducers";
import * as UserCategoryActions from "../../store/filtered-categories/user-category.action";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-up-user-filter-item",
  templateUrl: "./up-user-filter-item.component.html",
  styleUrls: ["./up-user-filter-item.component.css"]
})
export class UpUserFilterItemComponent implements OnInit, OnChanges {
  @Input() userData: UserFilterCategory;
  isSelected: boolean;
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 187,
        height: 114
      },
      grayscale: false
    }
  };
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {}

  ngOnChanges(simple: SimpleChanges) {
    if (simple["userData"]) {
      this.userData.displayPhotoFullPath = fetchImageObjectFromCloudFormation(
        this.userData.displayPhoto,
        this.editParams
      );
    }
  }
  onUserSelected(data: UserFilterCategory) {
    this.store.dispatch(new UserCategoryActions.SetSelectedUser(this.userData));
  }
}
