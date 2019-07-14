import { IRole } from './user-type';

export interface IAuthData {
  email: string;
  _id: string;
  token?: string;
  roles: IRole['name'][];
  permissions: {};
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
  email: string;
  name: string;
  password: string;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  isProfileCompleted: boolean;
  generalNotification: boolean;
  emailNotification: boolean;
  profileVisibility: boolean;
  loginCount: number;
  status: IUserAccountStatus;
  roles: IRole['_id'][];
  lastLogin: Date;
}
