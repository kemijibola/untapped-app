// import { Action } from "@ngrx/store";
// import { IContest } from "../../../interfaces";

// export const FETCH_CONTESTS_PREVIEW_LIST = "FETCH_CONTESTS_PREVIEW_LIST";
// export const FETCH_CONTESTS_PREVIEW_LIST_SUCCESS =
//   "FETCH_CONTESTS_PREVIEW_LIST_SUCCESS";
// export const FETCH_CONTEST_PREVIEW = "FETCH_CONTEST_PREVIEW";
// export const CREATE_CONTEST = "CREATE_CONTEST";
// export const SET_CONTEST_IN_EDIT_MODE = "SET_CONTEST_IN_EDIT_MODE";
// export const SET_CONTEST = "SET_CONTEST";
// export const SET_CONTEST_BANNER = "SET_CONTEST_BANNER";

// export class SetContestInEditMode implements Action {
//   readonly type = SET_CONTEST_IN_EDIT_MODE;
//   constructor(public payload: { editContest: IContest }) {}
// }

// export class SetContest implements Action {
//   readonly type = SET_CONTEST;
//   constructor(public payload: { contest: IContest }) {}
// }

// FETCH_CONTESTS_PREVIEW_LIST
// export class FetchContestsPreviewList implements Action {
//   readonly type = FETCH_CONTESTS_PREVIEW_LIST;
//   constructor(public payload: { })
// }

// export class CreateContest implements Action {
//   readonly type = CREATE_CONTEST;
//   constructor(public payload: { newContest: IContest }) {}
// }

// export class SetContestBanner implements Action {
//   readonly type = SET_CONTEST_BANNER;
//   constructor(public payload: { bannerKey: string }) {}
// }

// export type NewContestActions =
//   | CreateContest
//   | SetContestBanner
//   | SetContestInEditMode
//   | SetContest;
