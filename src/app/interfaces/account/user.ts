import { IRole } from './role';

export enum SocialMedia {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  OTHER = 'OTHER'
}

export interface IUserSocialMedia {
  type: SocialMedia;
  handles: string[];
}
export interface IAuthData {
  _id: string;
  token: string;
  roles: IRole['name'][];
  authenticated: boolean;
}

enum AccountStatus {
  ACTIVATED = 'ACTIVATED',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED'
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
  roles?: IRole['_id'][];
  lastLogin?: Date;
  createdAt?: Date;
}
