import { AppTab, Tab } from 'src/app/models';
import * as TabsAction from './tabs.actions';

export interface FeatureState {
    tabs: State;
}
export interface State {
    tabs: AppTab[];
}

const initialState: State = {
    tabs: []
};

export function TabsReducers(state = initialState, action: TabsAction.TabsAction) {
    switch (action.type) {
        case TabsAction.UPDATE_TAB:
        const tabByBame = state.tabs.filter(x => x.name === action.payload.name)[0];
        const selectedTab = tabByBame.tabs[action.payload.tabIndex];
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
        tabByBame.tabs.forEach(x => x.active = false);
        tabByBame.tabs[action.payload.tabIndex] = updateTab;
        return {
            ...state,
            tabs: [tabByBame]
        };
        case TabsAction.ADD_TAB:
            return {
                ...state,
                tabs: [...state.tabs, action.payload.tab]
            };
        case TabsAction.ADD_TABS:
            return {
                ...state,
                tabs: [...state.tabs, ...action.payload.tabs]
            };
        case TabsAction.DESTROY_TAB:
            return {
                ...state,
                tabs: []
            };
        default:
            return state;
    }
}


