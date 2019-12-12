import { ICategory, SocialMedia } from "../index";
import { IPhysicalAttribute } from "../index";

interface IUserSocialMedia {
  type: SocialMedia;
  handles: string[];
}

export interface IProfile {
  name?: string;
  rcNumber?: string;
  location: string;
  phoneNumbers?: string[];
  user: string;
  tapCount: number;
  shortBio?: string;
  categories?: ICategory["_id"][];
  socialMedias?: IUserSocialMedia[];
  physicalStats?: IPhysicalAttribute;
  bannerImagePath?: string;
}
