import { IUserSocialMedia } from "../account/user";

export interface IUserContestListAnalysis {
  contestId: string;
  contestTitle: string;
  contestBanner: string;
  contestViewCount: number;
  contestLikedByCount: number;
  commentCount: number;
  entryCount: number;
  fullContestBannerImage?: string;
  defaultContestBannerImage?: string;
}

export interface UserFilterCategory {
  _id: string;
  user: string;
  displayName: string;
  displayPhoto: string;
  bannerPhoto: string;
  displayPhotoFullPath?: string;
  defaultImageFullPath?: string;
  bannerPhotoFullPath?: string;
  location: string;
  userSocials: IUserSocialMedia[];
  categoryTypes: CategoryTypeWithCategory[];
  contests: IUserContestListAnalysis[];
  shortDescription: string;
  tapCount: number;
  contestCount: number;
  reportType: ReportType;
  userType: string;
  createdAt: Date;
  aliasName: string;
  dateJoined: Date;
  isSelected?: boolean;
}

export interface CategoryTypeWithCategory {
  categoryTypeId: string;
  categoryTypeName: string;
  category: string;
}

export enum ReportType {
  alltalents = "alltalents",
  allprofessionals = "allprofessionals",
  mosttap = "mosttap",
  highestcomment = "highestcomment",
  mostwatchedvideo = "mostwatchedvideo",
  mostplayedsong = "mostplayedsong",
  mostlikedphoto = "mostlikedphoto",
}

export interface UserFilterRequest {
  type?: ReportType;
  searchText?: string;
  categoryId?: string;
  userTypeId?: string;
}

// export enum FilterInputState {

// }