import { ICategory, SocialMedia } from "../index";
import { IPhysicalAttribute } from "../index";
import { CategoryType } from "../shared/TalentCategory";

interface IUserSocialMedia {
  type: SocialMedia;
  handle: string;
}

export interface ILocation {
  location: string;
  formattedAddres: string;
}

export interface IProfile {
  _id?: string;
  name?: string;
  rcNumber?: string;
  location: string;
  phoneNumbers?: string[];
  fullName?: string;
  tapCount?: number;
  shortBio?: string;
  categoryTypes?: CategoryType["_id"][];
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  additionalSocial?: string[];
  physicalStats?: IPhysicalAttribute;
  bannerImagePath?: string;
}
