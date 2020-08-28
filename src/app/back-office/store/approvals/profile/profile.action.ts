import { Action } from "@ngrx/store";
import { TalentProfile } from "src/app/interfaces";

export const FETCH_PENDING_USERS = "FETCH_PENDING_USERS";
export const FETCH_PENDING_USERS_SUCCESS = "FETCH_PENDING_USERS_SUCCESS";
export const FETCH_PENDING_USERS_FAILED = "FETCH_PENDING_USERS_FAILED";

export const APPROVE_USER = "APPROVE_USER";
export const APPROVE_USER_SUCCESS = "APPROVE_MEDIA_SUCCESS";
export const APPROVE_USER_FAILED = "APPROVE_USER_FAILED";

export class FetchPendingUsers implements Action {
  readonly type = FETCH_PENDING_USERS;
}

export class FetchPendingUsersSuccess implements Action {
  readonly type = FETCH_PENDING_USERS_SUCCESS;
  constructor(public payload: { pendingApprovals: TalentProfile[] }) {}
}

export class FetchPendingUsersFailed implements Action {
  readonly type = FETCH_PENDING_USERS_FAILED;
}

export class ApproveUser implements Action {
  readonly type = APPROVE_USER;
  constructor(public payload: { userId: string }) {}
}

export class ApproveUserSuccess implements Action {
  readonly type = APPROVE_USER_SUCCESS;
}

export class ApproveUserFailed implements Action {
  readonly type = APPROVE_USER_FAILED;
}

export type PendingUserAction =
  | FetchPendingUsers
  | FetchPendingUsersSuccess
  | FetchPendingUsersFailed
  | ApproveUser
  | ApproveUserSuccess
  | ApproveUserFailed;
