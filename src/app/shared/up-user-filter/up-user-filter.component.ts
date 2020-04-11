import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { UserFilterCategory } from "src/app/interfaces";
import * as UserCategoryActions from "../store/filtered-categories/talent-category.action";
import { ImageEditRequest } from "src/app/interfaces/media/image";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import * as TalentCategoryActions from "../store/filtered-categories/talent-category.action";
import * as fromTalentWithHighestComment from "../store/filtered-categories/talent-category.reducers";

@Component({
  selector: "app-up-user-filter",
  templateUrl: "./up-user-filter.component.html",
  styleUrls: ["./up-user-filter.component.css"],
})
export class UpUserFilterComponent implements OnInit, OnChanges {
  @Input() filteredUsers: UserFilterCategory[] = [];
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 187,
        height: 114,
      },
      grayscale: false,
    },
  };
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .pipe(
        select(fromTalentWithHighestComment.selectTalentWithHighestComments)
      )
      .subscribe((val: UserFilterCategory[]) => {
        console.log(val);
        if (val.length > 0) {
          this.filteredUsers = val;

          this.filteredUsers = this.filteredUsers.map((x) => {
            return Object.assign({}, x, {
              displayPhotoFullPath: fetchImageObjectFromCloudFormation(
                x.displayPhoto,
                this.editParams
              ),
            });
          });
          this.filteredUsers[0].isSelected = true;

          this.store.dispatch(
            new TalentCategoryActions.FetchTalentWithHighestComment({
              id: this.filteredUsers[0]._id,
            })
          );
        }
      });
  }

  ngOnChanges(simple: SimpleChanges) {
    if (simple["filteredUsers"]) {
      this.filteredUsers = this.filteredUsers.map((x) => {
        return Object.assign({}, x, {
          displayPhotoFullPath: fetchImageObjectFromCloudFormation(
            x.displayPhoto,
            this.editParams
          ),
        });
        this.filteredUsers[0].isSelected = true;
      });

      this.store.dispatch(
        new TalentCategoryActions.FetchTalentWithHighestComment({
          id: this.filteredUsers[0]._id,
        })
      );
    }
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
      new TalentCategoryActions.FetchTalentWithHighestComment({
        id: this.filteredUsers[index]._id,
      })
    );
  }

  getUserFullImage(key: string) {}
}
