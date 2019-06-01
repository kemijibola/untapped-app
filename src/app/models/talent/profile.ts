import { ICategory } from '../index';
import { IPhysicalAttribute } from '../index';

export interface IProfile {
    stage_name: string;
    location: string;
    phone_numbers: string[];
    short_bio: string;
    categories: ICategory[];
    physical_stats: IPhysicalAttribute;
}
