import { SocialMediaTypes } from "./../../interfaces/account/user";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromProfessionalFilter from "src/app/shared/store/filtered-categories/professional-category/professional-category.reducer";
import {
  UserFilterCategory,
  ReportType,
  IUserSocialMedia,
} from "src/app/interfaces";
import {
  fetchProfessionalBiodataBanner,
  fetchImageObjectFromCloudFormation,
  fetchProfessionalDefaultDisplayPicture,
  fetchDefaultContestBanner,
} from "src/app/lib/Helper";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import * as fromUserFilter from "../../shared/store/filtered-categories/user-filter/user-filter.reducer";
import * as _ from "underscore";

@Component({
  selector: "app-professional-biodata",
  templateUrl: "./professional-biodata.component.html",
  styleUrls: ["./professional-biodata.component.css"],
})
export class ProfessionalBiodataComponent implements OnInit {
  defaultBannerImage: string;
  defaultDisplayImage: string;
  selectedUser: UserFilterCategory = {
    _id: "",
    user: "",
    displayName: "",
    displayPhoto: "",
    bannerPhoto: "",
    displayPhotoFullPath: "",
    bannerPhotoFullPath: "",
    location: "",
    categoryTypes: [],
    userSocials: [],
    shortDescription: "",
    tapCount: 0,
    tappedBy: [],
    contestCount: 0,
    contests: [],
    reportType: ReportType.allprofessionals,
    userType: "",
    createdAt: new Date(),
    aliasName: "",
    dateJoined: new Date(),
    isSelected: false,
  };
  defaulrBannerEditParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 70,
        height: 70,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  bannerEditParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 877,
        height: 275,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  dpEditParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 160,
        height: 152,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  defaultDpEditParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 70,
        height: 70,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  userContestBannerEditParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 239,
        height: 149,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  defaultUserContestBannerEditParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 70,
        height: 70,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  facebookUrl: string = "";
  instagramUrl: string = "";
  twitterUrl: string = "";
  youTubeUrl: string = "";
  show: boolean = false;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .pipe(select(fromUserFilter.selectCurrentUser))
      .subscribe((val: UserFilterCategory) => {
        if (val) {
          if (_.has(val, "displayName")) {
            this.show = true;
            this.selectedUser = { ...val };
            if (val.contests.length > 0) this.setUserContestBannerImage();
            if (this.selectedUser.userSocials !== undefined) {
              for (let item of this.selectedUser.userSocials) {
                if (item.type === SocialMediaTypes.facebook)
                  this.facebookUrl = item.handle;
                if (item.type === SocialMediaTypes.twitter)
                  this.twitterUrl = item.handle;
                if (item.type === SocialMediaTypes.youtube)
                  this.youTubeUrl = item.handle;
                if (item.type === SocialMediaTypes.instagram)
                  this.instagramUrl = item.handle;
              }
            }

            this.defaultBannerImage = fetchImageObjectFromCloudFormation(
              val.bannerPhoto,
              this.bannerEditParams
            );

            this.selectedUser.bannerPhotoFullPath =
              val.bannerPhoto !== ""
                ? fetchImageObjectFromCloudFormation(
                    val.bannerPhoto,
                    this.bannerEditParams
                  )
                : fetchProfessionalBiodataBanner();

            this.defaultDisplayImage = fetchImageObjectFromCloudFormation(
              val.displayPhoto,
              this.defaultDpEditParams
            );

            this.selectedUser.displayPhotoFullPath =
              val.displayPhoto !== ""
                ? fetchImageObjectFromCloudFormation(
                    val.displayPhoto,
                    this.dpEditParams
                  )
                : fetchProfessionalDefaultDisplayPicture();
          } else {
            this.show = false;
          }
        }

        // console.log(this.selectedUser.bannerPhotoFullPath);
      });
  }

  setUserContestBannerImage() {
    this.selectedUser.contests = this.selectedUser.contests.map((x) => {
      return Object.assign({}, x, {
        fullContestBannerImage:
          x.contestBanner !== ""
            ? fetchImageObjectFromCloudFormation(
                x.contestBanner,
                this.userContestBannerEditParams
              )
            : fetchDefaultContestBanner(),
        defaultContestBannerImage: fetchImageObjectFromCloudFormation(
          x.contestBanner,
          this.defaultUserContestBannerEditParams
        ),
      });
    });
  }
}
