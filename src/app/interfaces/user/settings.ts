import { IUserAccountStatus } from '../account/user';

export interface ISettings {
  tapNotification: boolean;
  emailNotification: boolean;
  profileVisibility: boolean;
  status: IUserAccountStatus;
}
