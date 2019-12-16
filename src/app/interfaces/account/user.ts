import { IRole, IPermission } from "./role";

export enum SocialMedia {
  FACEBOOK = "FACEBOOK",
  TWITTER = "TWITTER",
  INSTAGRAM = "INSTAGRAM",
  YOUTUBE = "YOUTUBE",
  OTHER = "OTHER"
}

export enum UserTypes {
  Talent = "Talent",
  Audience = "Audience",
  Professional = "Professional"
}
export interface IUserSocialMedia {
  type: SocialMedia;
  handle: string;
}
export interface IAuthData {
  access_token: string;
  permissions: IPermission[];
  user_data: IUserData;
  authenticated: boolean;
}

interface IUserData {
  _id: string;
  full_name: string;
  email: string;
  profile_is_completed: boolean;
  profile_image_path: string;
  userType: UserType;
}

interface UserType {
  _id: string;
  name: string;
}

enum AccountStatus {
  ACTIVATED = "ACTIVATED",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED"
}
export interface IUserAccountStatus {
  status: AccountStatus;
  updatedAt: Date;
}

export interface IUser {
  _id?: string;
  email?: string;
  name?: string;
  profileImagePath?: string;
  password?: string;
  isEmailConfirmed?: boolean;
  isPhoneConfirmed?: boolean;
  isProfileCompleted?: boolean;
  generalNotification?: boolean;
  emailNotification?: boolean;
  profileVisibility?: boolean;
  loginCount?: number;
  status?: IUserAccountStatus;
  roles?: IRole["_id"][];
  lastLogin?: Date;
  createdAt?: Date;
}
