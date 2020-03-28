import { ISettings, AccountStatus } from "src/app/interfaces";
import * as UserSettingsActions from "./settings.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<ISettings> {
  settings: ISettings;
}

export const settingAdapter: EntityAdapter<ISettings> = createEntityAdapter<
  ISettings
>();

const initialState: State = settingAdapter.getInitialState({
  settings: null
});

export function settingsReducer(
  state = initialState,
  action: UserSettingsActions.UserSettingsAction
): State {
  switch (action.type) {
    case UserSettingsActions.SET_USERSETTINGS:
      return settingAdapter.setOne(action.payload.userSetting, state);
    case UserSettingsActions.UPDATE_USERSETTINGS:
      // TODO:: work on the update
      return settingAdapter.setOne(
        {
          tapNotification: false,
          emailNotification: false,
          profileVisibility: false,
          status: {
            status: AccountStatus.DELETED,
            updatedAt: new Date()
          }
        },
        state
      );
    default:
      return state;
  }
}
