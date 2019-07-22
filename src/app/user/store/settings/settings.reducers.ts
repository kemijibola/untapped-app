import { ISettings } from 'src/app/interfaces';
import * as UserSettingsActions from './settings.actions';

export interface State {
  settings: ISettings;
}

const initialState: State = {
  settings: null
};

export function settingsReducer(
  state = initialState,
  action: UserSettingsActions.UserSettingsAction
) {
  switch (action.type) {
    case UserSettingsActions.SET_USERSETTINGS:
      return {
        ...state,
        settings: Object.assign(state.settings, action.payload)
      };
    case UserSettingsActions.UPDATE_USERSETTINGS:
      // TODO:: work on the update
      return {};
    default:
      return state;
  }
}
