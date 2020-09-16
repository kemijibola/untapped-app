import { Action } from "@ngrx/store";
import {
  IContestList,
  ContestData,
  ContestEligibilityData,
  ContestVoteResult,
} from "../../interfaces";

export const FETCH_CONTESTS_PREVIEW = "FETCH_CONTESTS_PREVIEW";
export const FETCH_CONTESTS_PREVIEW_SUCCESS = "FETCH_CONTESTS_PREVIEW_SUCCESS";
export const FETCH_CONTESTS_PREVIEW_ERROR = "FETCH_CONTESTS_PREVIEW_ERROR";
export const SET_CONTESTS_PREVIEW = "SET_CONTESTS_PREVIEW";

export const FETCH_CONTEST_PREVIEW = "FETCH_CONTEST_PREVIEW";
export const RESET_CONTESTS_PREVIEW_TO_DEFAULT =
  "RESET_CONTESTS_PREVIEW_TO_DEFAULT";
export const FETCH_CONTEST_BY_ID = "FETCH_CONTEST_BY_ID";
export const FETCH_CONTEST_BY_ID_SUCCESS = "FETCH_CONTEST_BY_ID_SUCCESS";
export const CHECK_USER_ELIGIBILITY = "CHECK_USER_ELIGIBILITY";
export const CHECK_USER_ELIGIBILITY_SUCCESS = "CHECK_USER_ELIGIBILITY_SUCCESS";
export const RESET_CONTEST_DATA = "RESET_CONTEST_DATA";
export const RESET_USER_ELIGIBILITY_STATUS = "RESET_USER_ELIGIBILITY_STATUS";
export const FETCH_CONTEST_VOTE_RESULT = "FETCH_CONTEST_VOTE_RESULT";
export const SET_CONTEST_VOTE_RESULT = "SET_CONTEST_VOTE_RESULT";

export const ADD_CONTEST_LIKE = "ADD_CONTEST_LIKE";
export const ADD_CONTEST_LIKE_SUCCESS = "ADD_CONTEST_LIKE_SUCCESS";
export const ADD_CONTEST_LIKE_ERROR = "ADD_CONTEST_LIKE_ERROR";

export const REMOVE_CONTEST_LIKE = "REMOVE_CONTEST_LIKE";
export const REMOVE_CONTEST_LIKE_SUCCESS = "REMOVE_CONTEST_LIKE_SUCCESS";
export const REMOVE_CONTEST_LIKE_ERROR = "REMOVE_CONTEST_LIKE_ERROR";

export const POST_CONTEST_VIEW = "POST_CONTEST_VIEW";
export const POST_CONTEST_VIEW_SUCCESS = "POST_CONTEST_VIEW_SUCCESS";
export const POST_CONTEST_VIEW_FAILED = "POST_CONTEST_VIEW_FAILED";

export class FetchContestById implements Action {
  readonly type = FETCH_CONTEST_BY_ID;
  constructor(public payload: { id: string }) {}
}
export class FetchContestByIdSuccess implements Action {
  readonly type = FETCH_CONTEST_BY_ID_SUCCESS;
  constructor(public payload: { contest: ContestData }) {}
}
export class FetchContestsPreview implements Action {
  readonly type = FETCH_CONTESTS_PREVIEW;
  constructor(public payload: { perPage: number; page: number }) {}
}

export class FetchContestVoteResult implements Action {
  readonly type = FETCH_CONTEST_VOTE_RESULT;
  constructor(public payload: { contestId: string }) {}
}
export class SetContestVoteResult implements Action {
  readonly type = SET_CONTEST_VOTE_RESULT;
  constructor(public payload: { voteResult: ContestVoteResult }) {}
}

export class CheckUserEligibilitySuccess implements Action {
  readonly type = CHECK_USER_ELIGIBILITY_SUCCESS;
  constructor(public payload: { response: ContestEligibilityData }) {}
}

export class PostContestView implements Action {
  readonly type = POST_CONTEST_VIEW;
  constructor(public payload: { id: string }) {}
}
export class PostContestViewSuccess implements Action {
  readonly type = POST_CONTEST_VIEW_SUCCESS;
}

export class PostContestViewFailed implements Action {
  readonly type = POST_CONTEST_VIEW_FAILED;
}
export class CheckUserEligibility implements Action {
  readonly type = CHECK_USER_ELIGIBILITY;
  constructor(public payload: { contestId: string }) {}
}

export class FetchContestsPreviewSuccess implements Action {
  readonly type = FETCH_CONTESTS_PREVIEW_SUCCESS;
}

export class FetchContestsPreviewError implements Action {
  readonly type = FETCH_CONTESTS_PREVIEW_ERROR;
}

export class SetContestsPreview implements Action {
  readonly type = SET_CONTESTS_PREVIEW;
  constructor(public payload: { runningContests: IContestList[] }) {}
}

export class FetchContestPreview implements Action {
  readonly type = FETCH_CONTEST_PREVIEW;
  constructor(public payload: { contestPreviewId: string }) {}
}

export class ResetContestsPreviewToDefault implements Action {
  readonly type = RESET_CONTESTS_PREVIEW_TO_DEFAULT;
}

export class ResetContestData implements Action {
  readonly type = RESET_CONTEST_DATA;
}
export class ResetUserEligibilityStatus implements Action {
  readonly type = RESET_USER_ELIGIBILITY_STATUS;
}

export class AddContestLike implements Action {
  readonly type = ADD_CONTEST_LIKE;
  constructor(public payload: { contest: ContestData; likedBy: string }) {}
}

export class AddContestLikeSuccess implements Action {
  readonly type = ADD_CONTEST_LIKE_SUCCESS;
}

export class AddContestLikeError implements Action {
  readonly type = ADD_CONTEST_LIKE_ERROR;
  constructor(
    public payload: {
      contest: ContestData;
      likedBy: string;
    }
  ) {}
}

export class RemoveContestLike implements Action {
  readonly type = REMOVE_CONTEST_LIKE;
  constructor(public payload: { contest: ContestData; unLikedBy: string }) {}
}

export class RemoveContestLikeSuccess implements Action {
  readonly type = REMOVE_CONTEST_LIKE_SUCCESS;
}

export class RemoveContestLikeError implements Action {
  readonly type = REMOVE_CONTEST_LIKE_ERROR;
  constructor(
    public payload: {
      contest: ContestData;
      likedBy: string;
    }
  ) {}
}

export type ContestsAction =
  | FetchContestById
  | FetchContestsPreview
  | FetchContestsPreviewSuccess
  | FetchContestPreview
  | ResetContestsPreviewToDefault
  | FetchContestByIdSuccess
  | CheckUserEligibility
  | CheckUserEligibilitySuccess
  | ResetContestData
  | ResetUserEligibilityStatus
  | FetchContestVoteResult
  | SetContestVoteResult
  | SetContestsPreview
  | FetchContestsPreviewError
  | AddContestLike
  | AddContestLikeSuccess
  | AddContestLikeError
  | RemoveContestLike
  | RemoveContestLikeSuccess
  | RemoveContestLikeError
  | PostContestView
  | PostContestViewFailed
  | PostContestViewSuccess;
