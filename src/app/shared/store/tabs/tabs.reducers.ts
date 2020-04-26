import { IAppTab, IUpdateTab, ITab } from "src/app/interfaces";
import * as TabsAction from "./tabs.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./tabs.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface TabState extends EntityState<IAppTab> {
  selectAppTabId: string | number | null;
}

const initialState: TabState = fromAdapter.adapter.getInitialState({
  selectAppTabId: null,
});

export function reducer(
  state = initialState,
  action: TabsAction.TabsAction
): TabState {
  switch (action.type) {
    case TabsAction.ADD_TAB:
      return fromAdapter.adapter.setOne(action.payload.tabPanel, state);
    case TabsAction.UPSERT_TAB:
      return fromAdapter.adapter.upsertOne(action.payload, state);
    case TabsAction.FETCH_APP_TAB:
      return Object.assign({
        ...state,
        selectAppTabId: action.payload.appTabId,
      });
    case TabsAction.DESTROY_TAB:
      return fromAdapter.adapter.removeOne(action.payload.id, state);
    case TabsAction.DESTROY_TABS:
      return fromAdapter.adapter.removeAll({ ...state, selectAppTabId: null });
    default: {
      return state;
    }
  }
}

export const getSelectedAppTabId = (state: TabState) => state.selectAppTabId;

export const getAppTabState = createFeatureSelector<TabState>("tabState");

export const selectAppTabsIds = createSelector(
  getAppTabState,
  fromAdapter.selectAppTabIds
);

export const selectAppTabEntities = createSelector(
  getAppTabState,
  fromAdapter.selectAppTabEntities
);
export const selectAllAppabs = createSelector(
  getAppTabState,
  fromAdapter.selectAllAppTabs
);
export const appTabCount = createSelector(
  getAppTabState,
  fromAdapter.appTabCount
);

export const selectCurrentAppTabId = createSelector(
  getAppTabState,
  getSelectedAppTabId
);

export const selectCurrentTab = createSelector(
  selectAppTabEntities,
  selectCurrentAppTabId,
  (appTabEntities, appTabId) => appTabEntities[appTabId]
);
