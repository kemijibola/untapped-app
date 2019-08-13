import { IAppTab, ITab } from 'src/app/interfaces';
import * as TabsAction from './tabs.actions';

export interface State {
  tabs: IAppTab[];
}

const initialState: State = {
  tabs: []
};

export function TabsReducers(
  state = initialState,
  action: TabsAction.TabsAction
) {
  switch (action.type) {
    case TabsAction.UPDATE_TAB:
      const tabByBame = state.tabs.filter(
        x => x.name === action.payload.updateObj.name
      )[0];
      const selectedTab = tabByBame.tabs[action.payload.updateObj.tabIndex];
      const updateObj = {
        index: selectedTab.index,
        title: selectedTab.title,
        tag: selectedTab.tag,
        active: true
      };
      selectedTab.active = true;
      const updateTab = {
        ...selectedTab,
        ...updateObj
      };
      tabByBame.tabs.forEach(x => (x.active = false));
      tabByBame.tabs[action.payload.updateObj.tabIndex] = updateTab;
      return {
        ...state,
        tabs: [tabByBame]
      };
    case TabsAction.ADD_TAB:
      return {
        ...state,
        tabs: [...state.tabs, action.payload.appTab]
      };
    case TabsAction.ADD_TABS:
      return {
        ...state,
        tabs: [...state.tabs, ...action.payload.appTabs]
      };
    case TabsAction.DESTROY_TAB:
      // TODO:: implement tab destroy by global name
      return {
        ...state,
        tabs: []
      };
    default:
      return state;
  }
}
