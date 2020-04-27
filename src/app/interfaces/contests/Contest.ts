import { CategoryType } from "./../shared/TalentCategory";
import { IPrizeType } from "./PrizeType";
import { IUser } from "../account/user";

export enum PaymentStatus {
  Completed = "Completed",
  Failed = "Failed",
  Pending = "Pending",
  UnPaid = "UnPaid",
}

export enum ContestType {
  Online = "Online",
  OnlineOffline = "OnlineOffline",
}

export interface IUserContest {
  _id: string;
  title: string;
  entryCount: number;
  bannerImage: string;
}

export interface IContestList {
  _id: string;
  title: string;
  entryCount: number;
  viewCount: number;
  bannerImage: string;
  startDate: Date;
}

export interface IContest {
  _id?: string;
  title: string;
  code?: string;
  information: string;
  bannerImage: string;
  entryMediaType: string;
  eligibleCategories?: CategoryType["_id"][];
  evaluations?: string[];
  eligibilityInfo?: string;
  submissionRules?: string;
  startDate: Date;
  endDate: Date;
  views?: number;
  likes?: number;
  createdBy?: string;
  redeemable: IRedeemable[];
  paymentStatus?: PaymentStatus;
  issues?: IContestIssue[];
}

export interface IRedeemable {
  name: string;
  prizeCash: number;
}

export interface Category {
  _id: string;
  name: string;
}

export interface IContestIssue {
  complaintCategory: string;
  complaint: string;
  dateCreated: Date;
  complaintStatus: ComplaintStatus;
}

export enum ComplaintStatus {
  Opened = "Opened",
  Resolved = "Resolved",
}

export interface CreateContest {
  user: IUser["_id"];
  contest: IContest["_id"];
  submissionPath: string;
}
