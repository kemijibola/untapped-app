import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import {
  IAuthData,
  IComment,
  LikeViewModel,
  CommenterViewModel,
  IUserData,
} from "src/app/interfaces";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import * as CommentsActions from "../../shared/store/comments/comments.action";
import {
  fetchCommenterDefaultImage,
  fetchImageObjectFromCloudFormation,
} from "src/app/lib/Helper";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import { UUID } from "angular2-uuid";
import * as fromComment from "src/app/shared/store/comments/comments.reducers";

@Component({
  selector: "app-talent-comment",
  templateUrl: "./talent-comment.component.html",
  styleUrls: ["./talent-comment.component.css"],
})
export class TalentCommentComponent implements OnInit, OnChanges {
  isAuthenticated: boolean = false;
  @Input() mediaId: string;
  selectedMediaId: string = "";
  commentsLength: number = 0;
  mediaComments: IComment[] = [];
  isDisabled: boolean;
  mediaCommentForm: FormGroup;
  currentUser: IUserData;
  commenterImageParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 30,
        height: 30,
        fit: ImageFit.cover,
      },
      grayscale: false,
    },
  };
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit() {
    this.isDisabled = false;
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        this.isAuthenticated = val.authenticated;
        if (val.authenticated) {
          this.currentUser = val.user_data;
        }
      });

    this.store
      .pipe(select(fromComment.selectAllComments))
      .subscribe((val: IComment[]) => {
        this.commentsLength = val.length;
        if (this.commentsLength > 0) {
          val = this.sortCommentsByNewest(val);
          val.map((x) => {
            x = this.fetchCommenterProfileImage(x);
            this.mediaComments.push(x);
          });
        } else {
          this.mediaComments = [];
        }
      });

    this.mediaCommentForm = new FormGroup({
      mediaComment: new FormControl("", Validators.required),
    });
  }

  onLikeClicked(commentToLike: IComment) {
    const likedBy: LikeViewModel = {
      _id: this.currentUser._id,
      fullName: this.currentUser.full_name,
    };
    this.store.dispatch(
      new CommentsActions.AddCommentLike({ comment: commentToLike, likedBy })
    );
  }

  trackByFn(index: number, item: IComment) {
    return item._id;
  }

  onUnLikeClicked(commentToUnLike: IComment) {
    const unLikedBy: LikeViewModel = {
      _id: this.currentUser._id,
      fullName: this.currentUser.full_name,
    };
    this.store.dispatch(
      new CommentsActions.RemoveCommentLike({
        comment: commentToUnLike,
        unLikedBy,
      })
    );
  }

  onReplyClicked(commentId: string) {}

  sortCommentsByNewest(comments: IComment[]): IComment[] {
    return comments.sort((a, b) => {
      return this.getTime(b.createdAt) - this.getTime(a.createdAt);
    });
  }

  fetchCommenterProfileImage(comment: IComment): IComment {
    return Object.assign({}, comment, {
      commenterfullProfileImagePath:
        comment.user.profileImagePath === undefined
          ? fetchCommenterDefaultImage()
          : fetchImageObjectFromCloudFormation(
              comment.user.profileImagePath,
              this.commenterImageParams
            ),
    });
  }

  ngOnChanges(simple: SimpleChanges) {
    if (simple["mediaId"]) {
      this.selectedMediaId = this.mediaId;
    }
  }

  // checkIfUserHasLikedComment(currentUser: string, comments: IComment[]) {
  //   comments.map((x) => {
  //     const found = x.likedBy.filter((y) => y._id === currentUser)[0];
  //     x.hasLiked = found ? true : false;
  //     x.likeCount = x.likedBy ? x.likedBy.length : 0;
  //   });
  // }

  onSignUpClicked() {
    this.router.navigate(["/account/login"]);
  }

  onPostComment() {
    const mediaComment: string = this.mediaCommentForm.controls["mediaComment"]
      .value;

    const commentObj: IComment = {
      _id: UUID.UUID(),
      comment: mediaComment,
      entity: this.selectedMediaId,
      user: {
        _id: this.currentUser._id,
        fullName: this.currentUser.full_name,
        profileImagePath: this.currentUser.profile_image_path,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.store.dispatch(
      new CommentsActions.AddMediaComment({ mediaComment: commentObj })
    );
    this.mediaCommentForm.controls["mediaComment"].setValue("");
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }
}
