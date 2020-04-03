import { Action } from "@ngrx/store";
import { IAppTab, IUpdateTab, ITab } from "src/app/interfaces";

export const ADD_TAB = "ADD_TAB";
export const FETCH_APP_TAB = "FETCH_APP_TAB";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const INITIATE_TAB_UPDATE = "INITIATE_TAB_UPDATE";
export const UPSERT_TAB = "UPSERT_TAB";
export const UPDATE_TAB = "UPDATE_TAB";
export const DESTROY_TAB = "DESTROY_TAB";
export const DESTROY_TABS = "DESTROY_TABS";
export const DESTROY_ALL = "DESTROY_ALL";

export class AddTab implements Action {
  readonly type = ADD_TAB;
  constructor(public payload: { tabPanel: IAppTab }) {}
}

export class FetchAppTab implements Action {
  readonly type = FETCH_APP_TAB;
  constructor(public payload: { appTabId: string }) {}
}

export class SetActiveTab implements Action {
  readonly type = SET_ACTIVE_TAB;
  constructor(public payload: { activeTab: ITab }) {}
}
export class UpdateTab implements Action {
  readonly type = UPDATE_TAB;
  constructor(public payload: { appTabId: string; tabToActivate: string }) {}
}

export class UpsertTab implements Action {
  readonly type = UPSERT_TAB;
  constructor(public payload: IAppTab) {}
}

export class DestroyTab implements Action {
  readonly type = DESTROY_TAB;
  constructor(public payload: { id: string }) {}
}

export class DestroyTabs implements Action {
  readonly type = DESTROY_TABS;
  constructor(public payload: { ids: string[] }) {}
}

export class DestroyAll implements Action {
  readonly type = DESTROY_TABS;
}

export class InitiateTabUpdate implements Action {
  readonly type = INITIATE_TAB_UPDATE;
  constructor(public payload: { tabPanel: IAppTab; tabName: string }) {}
}

export type TabsAction =
  | AddTab
  | UpdateTab
  | UpsertTab
  | DestroyTab
  | DestroyTabs
  | DestroyAll
  | InitiateTabUpdate
  | SetActiveTab
  | FetchAppTab;
// export const ADD_TAB = 'ADD_TAB';
// export const ADD_TABS = 'ADD_TABS';
// export const UPDATE_TAB = 'UPDATE_TAB';
// export const DESTROY_TAB = 'DESTROY_TAB';

// export class AddTab implements Action {
//   readonly type = ADD_TAB;
//   constructor(public payload: { appTab: IAppTab }) {}
// }

// export class AddTabs implements Action {
//   readonly type = ADD_TABS;
//   constructor(public payload: { appTabs: IAppTab[] }) {}
// }
// export class UpdateTab implements Action {
//   readonly type = UPDATE_TAB;
//   constructor(public payload: { updateObj: IUpdateTab }) {}
// }
// export class DestroyTab implements Action {
//   readonly type = DESTROY_TAB;
//   constructor(public payload: { name: string }) {}
// }

// export type TabsAction = UpdateTab | AddTab | DestroyTab | AddTabs;
