import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { selectUserData } from "src/app/account/store/auth.selectors";
import { IAuthData, IComment } from "src/app/interfaces";
import { Router } from "@angular/router";
import { selectTalentMediaComments } from "src/app/shared/store/comments/comments.selectors";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import * as CommentsActions from "../../shared/store/comments/comments.action";
import {
  fetchCommenterDefaultImage,
  fetchImageObjectFromCloudFormation
} from "src/app/lib/Helper";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";

@Component({
  selector: "app-talent-comment",
  templateUrl: "./talent-comment.component.html",
  styleUrls: ["./talent-comment.component.css"]
})
export class TalentCommentComponent implements OnInit, OnChanges {
  isAuthenticated: boolean = false;
  @Input() mediaId: string;
  selectedMediaId: string = "";
  commentsLength: number = 0;
  mediaComments: IComment[] = [];
  mediaCommentForm: FormGroup;
  commenterImageParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 30,
        height: 30,
        fit: ImageFit.cover
      },
      grayscale: false
    }
  };
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit() {
    this.store.pipe(select(selectUserData)).subscribe((val: IAuthData) => {
      this.isAuthenticated = val.authenticated;
    });

    this.store
      .pipe(select(selectTalentMediaComments))
      .subscribe((val: IComment[]) => {
        this.commentsLength = val.length;
        this.mediaComments = val.sort((a, b) => {
          return this.getTime(b.createdAt) - this.getTime(a.createdAt);
        });
        this.fetchCommenterProfileImage(this.mediaComments);
      });

    this.mediaCommentForm = new FormGroup({
      mediaComment: new FormControl("", Validators.required)
    });
  }

  fetchCommenterProfileImage(comments: IComment[]) {
    comments.map(x => {
      x.user.fullProfileImagePath =
        x.user.profileImagePath === undefined
          ? fetchCommenterDefaultImage()
          : fetchImageObjectFromCloudFormation(
              x.user.profileImagePath,
              this.commenterImageParams
            );
    });
  }

  ngOnChanges(simple: SimpleChanges) {
    if (simple["mediaId"]) {
      this.selectedMediaId = this.mediaId;
    }
  }
  onSignUpClicked() {
    this.router.navigate(["/account/signin"]);
  }

  onPostComment() {
    const mediaComment: string = this.mediaCommentForm.controls["mediaComment"]
      .value;
    const commentObj: IComment = {
      comment: mediaComment,
      media: this.selectedMediaId
    };

    this.store.dispatch(new CommentsActions.PostMediaComment(commentObj));
    this.mediaCommentForm.controls["mediaComment"].setValue("");
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }
}
