import { Tab } from 'src/app/models';
import * as TabsAction from './tabs.actions';

export interface FeatureState {
    tabs: State;
}
export interface State {
    tabs: Tab[];
    selectedTab: Tab;
}

const initialState: State = {
    tabs: [],
    selectedTab: null
};

export function TabsReducers(state = initialState, action: TabsAction.TabsAction) {
    switch (action.type) {
        case TabsAction.UPDATE_TAB:
            action.payload.tab.active = true;
            const tab = state.tabs[action.payload.index];
            const updatedTab = {
                ...tab,
                ...action.payload.tab
            };
            const tabs = [...state.tabs];
            tabs.forEach(x => x.active = false);
            tabs[action.payload.tab.index] = updatedTab;
            return {
                ...state,
                tabs: [...tabs]
            };
        case TabsAction.ADD_TABS:
            return {
                ...state,
                tabs: action.payload.tabs
            };
        default:
            return state;
    }
}


