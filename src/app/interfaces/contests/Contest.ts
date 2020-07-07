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
  fullBannerImage?: string;
  defaultBannerImage?: string;

  endDate: Date;
}

export interface IContest {
  _id?: string;
  title: string;
  code?: string;
  information: string;
  bannerImage: string;
  entryMediaType: string;
  eligibleCategories?: string[];
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
  user: string;
  contest: string;
  submissionPath: string;
}

export interface IContestEntry {
  _id?: string;
  user?: string;
  contest: string;
  likedBy?: string[];
  title: string;
  additionalInfo?: string;
  contestantCode?: string;
  entry: string;
  fullUserProfileImage?: string;
}

export interface ContestData {
  contest: IContest;
  submissions: IEntryData[];
}

export interface IEntryData {
  entry: IContestEntry;
  commentCount: number;
  totalVote: number;
  fullUserProfileImage?: string;
}

export enum EligibilityStatus {
  entered = "entered",
  noteligible = "noteligible",
  eligible = "eligible",
  default = "default",
}
export interface ContestEligibilityData {
  status: boolean;
  eligibility: EligibilityStatus;
  message?: string;
}

export interface IContestContestant {
  entryId: string;
  contestantName: string;
  contestantPhoto: string;
  contestantCode: string;
  contestantTotalVote: number;
  fullUserProfileImage?: string;
  defaultUserProfileImage?: string;
}

export interface ContestVoteResult {
  contestId: string;
  contestPhoto: string;
  contestTitle: string;
  contestStartDate: Date;
  contestDuration: string;
  contestHasEnded: boolean;
  contestTotalVote: number;
  contestTotalValidVote: number;
  contestTotalInvalidVote: number;
  entries: IContestContestant[];
}

export const VoteEvent = {
  VOTE_RESULT: "VOTE_RESULT",
};
