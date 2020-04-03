import { State } from "./../service/service.reducers";
import { IAppTab, IUpdateTab, ITab } from "src/app/interfaces";
import * as TabsAction from "./tabs.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./tabs.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface TabState extends EntityState<IAppTab> {
  selectAppTabId: string | number | null;
  tabToUpdate: IAppTab | null;
  activeTab: ITab | null;
}

const initialState: TabState = fromAdapter.adapter.getInitialState({
  selectAppTabId: null,
  tabToUpdate: null,
  activeTab: null
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
    case TabsAction.SET_ACTIVE_TAB:
      return Object.assign({
        ...state,
        activeTab: action.payload.activeTab
      });
    case TabsAction.FETCH_APP_TAB:
      return Object.assign({
        ...state,
        selectAppTabId: action.payload.appTabId
      });
    case TabsAction.DESTROY_TAB:
      return fromAdapter.adapter.removeOne(action.payload.id, state);
    case TabsAction.DESTROY_TABS:
      return fromAdapter.adapter.removeAll({ ...state, selectedUserId: null });
    default: {
      return state;
    }
  }
}

export const getSelectedAppTabId = (state: TabState) => state.selectAppTabId;

export const getSelectedTabToUpdate = (state: TabState) => state.tabToUpdate;

export const getActiveTab = (state: TabState) => state.activeTab;

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

export const selectCurrentTabToUpdate = createSelector(
  getAppTabState,
  getSelectedTabToUpdate
);

export const selectAtivatedTab = createSelector(getAppTabState, getActiveTab);

export const selectCurrentTab = createSelector(
  selectAppTabEntities,
  selectCurrentAppTabId,
  (appTabEntities, appTabId) => appTabEntities[appTabId]
);

// import { IAppTab } from "src/app/interfaces";
// import * as TabsAction from "./tabs.actions";

// export interface State {
//   tabs: IAppTab[];
// }

// const initialState: State = {
//   tabs: []
// };

// export function TabsReducers(
//   state = initialState,
//   action: TabsAction.TabsAction
// ) {
//   switch (action.type) {
//     case TabsAction.UPDATE_TAB:
//       const tabByBame = state.tabs.filter(
//         x => x.name === action.payload.updateObj.name
//       )[0];
//       const selectedTab = tabByBame.tabs[action.payload.updateObj.tabIndex];
//       const updateObj = {
//         index: selectedTab.index,
//         title: selectedTab.title,
//         tag: selectedTab.tag,
//         active: true
//       };
//       selectedTab.active = true;
//       const updateTab = {
//         ...selectedTab,
//         ...updateObj
//       };
//       tabByBame.tabs.forEach(x => (x.active = false));
//       tabByBame.tabs[action.payload.updateObj.tabIndex] = updateTab;
//       return {
//         ...state,
//         tabs: [tabByBame]
//       };
//     case TabsAction.ADD_TAB:
//       return {
//         ...state,
//         tabs: [...state.tabs, action.payload.appTab]
//       };
//     case TabsAction.ADD_TABS:
//       return {
//         ...state,
//         tabs: [...action.payload.appTabs]
//       };
//     case TabsAction.DESTROY_TAB:
//       // TODO:: implement tab destroy by global name
//       return {
//         ...state,
//         tabs: []
//       };
//     default:
//       return state;
//   }
// }
