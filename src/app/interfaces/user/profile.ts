import { ICategory } from "../index";
import { IPhysicalAttribute } from "../index";
import { CategoryType } from "../shared/TalentCategory";

export interface ILocation {
  location: string;
  formattedAddres: string;
}

export interface UserProfileAddress {
  userAddress?: ILocation;
}
export interface IProfile extends UserProfileAddress {
  _id?: string;
  name?: string;
  rcNumber?: string;
  location?: string;
  formattedAddres?: string;
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

export interface TalentProfile {
  talentId: string;
  talentName: string;
  emailConfirmed: boolean;
  profilePicture: string;
  dateJoined: Date;
  portfolioApproved: boolean;
  shortBio: string;
  phoneNumber: string;
}
