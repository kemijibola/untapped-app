import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { selectAllTalents } from "./../store/filtered-categories/user-category.selectors";
import { UserFilterCategory } from "src/app/interfaces";
import * as UserCategoryActions from "../store/filtered-categories/user-category.action";
import { ImageEditRequest } from "src/app/interfaces/media/image";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";

@Component({
  selector: "app-up-user-filter",
  templateUrl: "./up-user-filter.component.html",
  styleUrls: ["./up-user-filter.component.css"]
})
export class UpUserFilterComponent implements OnInit {
  filteredUsers: UserFilterCategory[] = [];
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

  ngOnInit() {
    this.store
      .pipe(select(selectAllTalents))
      .subscribe((val: UserFilterCategory[]) => {
        this.filteredUsers = val;
        this.filteredUsers.map(x => {
          x.displayPhotoFullPath = fetchImageObjectFromCloudFormation(
            x.displayPhoto,
            this.editParams
          );
        });
        this.filteredUsers[0].isSelected = true;
      });

    this.store.dispatch(
      new UserCategoryActions.SetSelectedUser(this.filteredUsers[0])
    );
  }

  onUserSelected(index: number) {
    this.filteredUsers.map((x: UserFilterCategory, i: number) => {
      if (i === index) {
        x.isSelected = true;
      } else {
        x.isSelected = false;
      }
    });
    this.store.dispatch(
      new UserCategoryActions.SetSelectedUser(this.filteredUsers[index])
    );
  }

  getUserFullImage(key: string) {}
}
