import { Action } from "@ngrx/store";
import { IMedia } from "src/app/interfaces";

export const FETCH_PENDING_APPROVALS = "FETCH_PENDING_APPROVALS";
export const FETCH_PENDING_APPROVALS_SUCCESS =
  "FETCH_PENDING_APPROVALS_SUCCESS";
export const FETCH_PENDING_APPROVALS_FAILED = "FETCH_PENDING_APPROVALS";
export const FETCH_PENDING_APPROVAL = "FETCH_PENDING_APPROVAL";

export const APPROVE_MEDIA = "APPROVE_MEDIA";
export const APPROVE_MEDIA_SUCCESS = "APPROVE_MEDIA_SUCCESS";
export const APPROVE_MEDIA_FAILED = "APPROVE_MEDIA_FAILED";

export const REJECT_MEDIA = "REJECT_MEDIA";
export const REJECT_MEDIA_SUCCESS = "REJECT_MEDIA_SUCCESS";
export const REJECT_MEDIA_FAILED = "REJECT_MEDIA_FAILED";

export class FetchPendingApprovals implements Action {
  readonly type = FETCH_PENDING_APPROVALS;
}

export class FetchPendingApprovalsSuccess implements Action {
  readonly type = FETCH_PENDING_APPROVALS_SUCCESS;
  constructor(public payload: { pendingApprovals: IMedia[] }) {}
}
export class FetchPendingApproval implements Action {
  readonly type = FETCH_PENDING_APPROVAL;
  constructor(public payload: { pendingMediaId: string }) {}
}

export class FetchPendingApprovalsFailed implements Action {
  readonly type = FETCH_PENDING_APPROVALS_FAILED;
}

export class ApproveMedia implements Action {
  readonly type = APPROVE_MEDIA;
  constructor(public payload: { mediaId: string; mediaItemId: string }) {}
}

export class ApproveMediaSuccess implements Action {
  readonly type = APPROVE_MEDIA_SUCCESS;
}

export class ApproveMediaFailed implements Action {
  readonly type = APPROVE_MEDIA_FAILED;
}

export class RejectMedia implements Action {
  readonly type = REJECT_MEDIA;
  constructor(
    public payload: { mediaId: string; mediaItemId: string; reason: string }
  ) {}
}

export class RejectMediaSuccess implements Action {
  readonly type = REJECT_MEDIA_SUCCESS;
}

export class RejectMediaFailed implements Action {
  readonly type = REJECT_MEDIA_FAILED;
}

export type PendingMediaAction =
  | FetchPendingApprovals
  | FetchPendingApprovalsSuccess
  | FetchPendingApprovalsFailed
  | ApproveMedia
  | ApproveMediaSuccess
  | ApproveMediaFailed
  | RejectMedia
  | RejectMediaSuccess
  | RejectMediaFailed
  | FetchPendingApproval;
