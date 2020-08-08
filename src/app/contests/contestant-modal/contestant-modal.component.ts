import { VideoItem } from "./../../interfaces/user/portfolio";
import { DeleteAutData } from "./../../account/store/auth.actions";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromModal from "../../shared/store/modals/modals.reducers";
import { VgMedia } from "videogular2/compiled/core";
import { VgAPI } from "ngx-videogular";
import {
  IModal,
  IEntryData,
  IUserData,
  IComment,
  IAuthData,
  LikeViewModel,
  IContestEntry,
  MediaType,
  AudioItem,
  NavigationData,
} from "src/app/interfaces";
import * as fromApp from "../../store/app.reducers";
import * as CommentsActions from "../../shared/store/comments/comments.action";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import * as fromAuth from "src/app/account/store/auth.reducers";
import * as fromComment from "src/app/shared/store/comments/comments.reducers";
import {
  fetchCommenterDefaultImage,
  fetchImageObjectFromCloudFormation,
  fetchNoMediaDefaultImage,
} from "src/app/lib/Helper";
import { Router } from "@angular/router";
import { UUID } from "angular2-uuid";
import { environment } from "../../../environments/environment";
import * as _ from "underscore";

@Component({
  selector: "app-contestant-modal",
  templateUrl: "./contestant-modal.component.html",
  styleUrls: ["./contestant-modal.component.css"],
})
export class ContestantModalComponent implements OnInit, OnChanges {
  @Input() mediaType: string;
  // entryData: IContestEntry = {
  //   _id: "",
  //   user: "",
  //   contest: "",
  //   likedBy: [],
  //   title: "",
  //   additionalInfo: "",
  //   contestantCode: "",
  //   entry: "",
  //   fullUserProfileImage: "",
  // };

  entryData: IEntryData = {
    commentCount: 0,
    entry: {
      _id: "",
      user: "",
      contest: "",
      likedBy: [],
      title: "",
      additionalInfo: "",
      contestantCode: "",
      entry: "",
      fullUserProfileImage: "",
    },
    fullUserProfileImage: "",
    totalVote: 0,
  };
  commentsLength: number = 0;
  mediaComments: IComment[] = [];
  isDisabled: boolean;
  isAuthenticated: boolean = false;
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
  isCurrentImageSet: boolean;
  isCurrentAudioSet: boolean;
  isCurrentVideoSet: boolean;

  contestantImageParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 64,
        height: 64,
        fit: ImageFit.cover,
      },
      grayscale: false,
    },
  };
  currentUser: IUserData;
  contestantCommentForm: FormGroup;
  currentAudioItem: AudioItem = {
    _id: "",
    key: "",
    path: "",
    type: "",
    fullAudioPath: "",
  };

  currentVideoItem: VideoItem = {
    _id: "",
    key: "",
    path: "",
    type: "",
    fullVideoPath: "",
  };
  defaultImagePath: string = "";
  defaultImageParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 529,
        height: 517,
        fit: ImageFit.cover,
      },
      grayscale: false,
    },
  };
  defaultImgParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 70,
        height: 70,
        fit: ImageFit.cover,
      },
      grayscale: false,
    },
  };
  imagePath: string = "";
  keyword = environment.CONTEST_KEYWORD;
  textNumber = environment.CONTEST_TO_NUMBER;
  type: string = "";

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store
      .pipe(select(fromModal.selectCurrentNavigationData))
      .subscribe((val: NavigationData) => {
        if (val) {
          if (val.data) {
            this.setMedia(val.mediaType, val.data["entry"].entry);
            this.setContestantProfileIImage(val.data);
            this.store.dispatch(
              new CommentsActions.FetchMediaComments({
                entityId: this.entryData.entry._id,
              })
            );
          }
        }
      });

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
          this.mediaComments = this.sortCommentsByNewest(val);
          this.mediaComments = this.fetchCommenterProfileImage(val);
          if (_.has(this.currentUser, "_id")) {
            this.checkIfUserHasLikedComment(
              this.currentUser._id,
              this.mediaComments
            );
          }
        } else {
          this.mediaComments = [];
        }
      });

    this.contestantCommentForm = new FormGroup({
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

  setContestantProfileIImage(data: IEntryData) {
    this.entryData = Object.assign({}, data, {
      fullUserProfileImage:
        data.entry.user["profileImagePath"] !== ""
          ? fetchImageObjectFromCloudFormation(
              data.entry.user["profileImagePath"],
              this.contestantImageParams
            )
          : fetchNoMediaDefaultImage(),
    });
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

  ngOnChanges(simple: SimpleChanges) {
    if (simple["mediaType"]) {
      this.type = this.mediaType;
    }
  }

  setMedia(type: string, mediaKey: string) {
    const mediaType = type.toUpperCase();
    console.log("media called", mediaType);
    this.isCurrentImageSet = false;
    this.isCurrentAudioSet = false;
    this.isCurrentVideoSet = false;
    switch (mediaType) {
      case MediaType.AUDIO:
        this.setCurrentAudio(mediaKey);
        break;
      case MediaType.IMAGE:
        this.setCurrentImage(mediaKey);
        break;
      case MediaType.VIDEO:
        this.setCurrentVideo(mediaKey);
        break;
      default:
        break;
    }
  }

  setCurrentVideo(key: string) {
    this.isCurrentImageSet = false;
    this.isCurrentAudioSet = false;
    this.isCurrentVideoSet = true;
    const video: VideoItem = {
      path: key,
    };
    this.currentVideoItem = video;
  }

  setCurrentAudio(key: string) {
    this.isCurrentImageSet = false;
    this.isCurrentVideoSet = false;
    this.isCurrentAudioSet = true;
    const audio: AudioItem = {
      path: key,
    };
    this.currentAudioItem = audio;
  }

  setCurrentImage(key: string) {
    this.isCurrentImageSet = true;
    this.isCurrentAudioSet = false;
    this.isCurrentVideoSet = false;
    this.defaultImagePath = fetchImageObjectFromCloudFormation(
      key,
      this.defaultImgParams
    );
    this.imagePath =
      key !== ""
        ? fetchImageObjectFromCloudFormation(key, this.defaultImageParams)
        : fetchNoMediaDefaultImage();
  }

  onReplyClicked(commentId: string) {
    console.log("reply comment");
  }

  sortCommentsByNewest(comments: IComment[]): IComment[] {
    return comments.sort((a, b) => {
      return this.getTime(b.createdAt) - this.getTime(a.createdAt);
    });
  }

  fetchCommenterProfileImage(comments: IComment[]): IComment[] {
    return comments.map((x) => {
      return Object.assign({}, x, {
        commenterfullProfileImagePath:
          x.user.profileImagePath === undefined
            ? fetchCommenterDefaultImage()
            : fetchImageObjectFromCloudFormation(
                x.user.profileImagePath,
                this.commenterImageParams
              ),
      });
    });
  }

  // activateModalContent(): void {
  //   this.store
  //     .pipe(select(fromModal.selectCurrentActiveModal))
  //     .subscribe((val: IModal) => {
  //       if (val) {
  //         if (val.name === "talent-entry-details" && val.data !== null) {
  //           if (val.data) {
  //             this.setMedia(val.contentType, val.data["entry"].entry);
  //             this.setContestantProfileIImage(val.data);
  //             this.store.dispatch(
  //               new CommentsActions.FetchMediaComments({
  //                 entityId: this.entryData.entry._id,
  //               })
  //             );
  //           }
  //         }
  //       }
  //     });
  // }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  checkIfUserHasLikedComment(currentUser: string, comments: IComment[]) {
    comments.map((x) => {
      const found = x.likedBy.filter((y) => y._id === currentUser)[0];
      x.hasLiked = found ? true : false;
      x.likeCount = x.likedBy ? x.likedBy.length : 0;
    });
  }

  onSignUpClicked() {
    this.router.navigate(["/account/signin"]);
  }

  onPostComment() {
    const mediaComment: string = this.contestantCommentForm.controls[
      "mediaComment"
    ].value;

    const commentObj: IComment = {
      _id: UUID.UUID(),
      comment: mediaComment,
      entity: this.entryData.entry._id,
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
    this.contestantCommentForm.controls["mediaComment"].setValue("");
  }
}
