import { IContestEntry } from "../contests/Contest";

export interface ContestWithEntriesPreview {
  contest: IContestPreview;
  entries: IContestEntry[];
}
export interface IContestPreview {
  _id: string;
  title: string;
  banner: string;
  entryCount: number;
}
