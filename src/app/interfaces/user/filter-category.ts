export interface UserFilterCategory {
  _id: string;
  user: string;
  displayName: string;
  displayPhoto: string;
  displayPhotoFullPath?: string;
  categoryTypes: CategoryTypeWithCategory[];
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
  mostlikedphoto = "mostlikedphoto"
}
