import { IContest } from './Contest';
import { IUserSocialMedia } from '../account/user';

export interface IJudge {
  contestId: IContest['_id'];
  name: string;
  email: string;
  profile: string;
  socialMedias: IUserSocialMedia[];
  profession: string[];
  judgeProfileImage: string;
  yearsOfExperience: number;
}
