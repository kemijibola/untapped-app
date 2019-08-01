import { ICategory } from '../shared/category';
import { IPrizeType } from './PrizeType';
import { IUser } from '../account/user';

export enum PaymentStatus {
  Completed = 'Completed',
  Failed = 'Failed',
  Pending = 'Pending',
  UnPaid = 'UnPaid'
}

export enum ContestType {
  Online = 'Online',
  OnlineOffline = 'OnlineOffline'
}

export interface IRedeemable {
  prizeType: IPrizeType['_id'];
  prizes: any[];
}

export interface IUserContest {
  title: string;
  entryCount: number;
  bannerImage: string;
}
export interface IContestList {
  title: string;
  entryCount: number;
  viewCount: number;
  bannerImage: string;
}

export interface IContest {
  _id?: string;
  title: string;
  information: string;
  bannerImage: string;
  eligibleCategories: ICategory['_id'];
  eligibilityInfo: string;
  submissionRules: string;
  startDate: Date;
  endDate: Date;
  redeemable: IRedeemable;
  contestType: ContestType;
  createdBy: IUser['_id'];
  paymentStatus: PaymentStatus;
  issues?: IContestIssue[];
}

export interface IContestIssue {
  complaintCategory: string;
  complaint: string;
  dateCreated: Date;
  complaintStatus: ComplaintStatus;
}

export enum ComplaintStatus {
  Opened = 'Opened',
  Resolved = 'Resolved'
}
