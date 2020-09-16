import {
  AllContestViewModel,
  CompetitionParticipant,
} from "./../../../interfaces/user/filter-category";
import { Action } from "@ngrx/store";
import { IUserContestListAnalysis, IVoteResult } from "../../../interfaces";

export const FETCH_USER_CONTEST_LIST = "FETCH_USER_CONTEST_LIST";
export const FETCH_USER_CONTEST_LIST_SUCCESS =
  "FETCH_USER_CONTEST_LIST_SUCCESS";
export const FETCH_USER_CONTEST_BY_ID = "FETCH_USER_CONTEST_BY_ID";

export const FETCH_COMPETITION_PARTICIPANTS = "FETCH_COMPETITION_PARTICIPANTS";
export const FETCH_COMPETITION_PARTICIPANTS_SUCCESS =
  "FETCH_COMPETITION_PARTICIPANTS_SUCCESS";
export const FETCH_COMPETITION_PARTICIPANTS_FAILED =
  "FETCH_COMPETITION_PARTICIPANTS_FAILED";

export const FETCH_COMPETITION_RESULT = "FETCH_COMPETITION_RESULT";
export const FETCH_COMPETITION_RESULT_SUCCESS =
  "FETCH_COMPETITION_RESULT_SUCCESS";
export const FETCH_COMPETITION_RESULT_FAILED =
  "FETCH_COMPETITION_RESULT_FAILED";

export class FetchUserContestList implements Action {
  readonly type = FETCH_USER_CONTEST_LIST;
  constructor(public payload: { perPage: number; page: number }) {}
}

export class FetchUserContestListSuccess implements Action {
  readonly type = FETCH_USER_CONTEST_LIST_SUCCESS;
  constructor(public payload: { userContests: AllContestViewModel[] }) {}
}

export class FetchUserContestById implements Action {
  readonly type = FETCH_USER_CONTEST_BY_ID;
  constructor(public payload: { contestId: string }) {}
}

export class FetchCompetitionParticipants implements Action {
  readonly type = FETCH_COMPETITION_PARTICIPANTS;
  constructor(public payload: { contestId: string }) {}
}

export class FetchCompetitionParticipantsSuccess implements Action {
  readonly type = FETCH_COMPETITION_PARTICIPANTS_SUCCESS;
  constructor(public payload: { participants: CompetitionParticipant[] }) {}
}

export class FetchCompetitionParticipantsFailed implements Action {
  readonly type = FETCH_COMPETITION_PARTICIPANTS_FAILED;
}

export class FetchCompetitionResult implements Action {
  readonly type = FETCH_COMPETITION_RESULT;
  constructor(public payload: { contestId: string }) {}
}

export class FetchCompetitionResultSuccess implements Action {
  readonly type = FETCH_COMPETITION_RESULT_SUCCESS;
  constructor(public payload: { competitionResults: IVoteResult[] }) {}
}

export class FetchCompetitionResultFailed implements Action {
  readonly type = FETCH_COMPETITION_RESULT_FAILED;
}

export type AllContestActions =
  | FetchUserContestList
  | FetchUserContestListSuccess
  | FetchUserContestById
  | FetchCompetitionParticipants
  | FetchCompetitionParticipantsSuccess
  | FetchCompetitionParticipantsFailed
  | FetchCompetitionResult
  | FetchCompetitionResultSuccess
  | FetchCompetitionResultFailed;
