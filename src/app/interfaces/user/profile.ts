import { ICategory } from '../index';
import { IPhysicalAttribute } from '../index';

export interface IProfile {
  stage_name: string;
  location: string;
  phone_number: string;
  short_bio: string;
  categories: ICategory['name'][];
  social_media: string[];
  profile_picture: string;
  physical_stats: IPhysicalAttribute;
}
