import * as NotificationActions from "./notification.action";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./notification.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface NotificationState extends EntityState<any> {}

const initialState: NotificationState = fromAdapter.adapter.getInitialState({});

export function reducer(
  state = initialState,
  action: NotificationActions.NotificationActions
): NotificationState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const getNotificationState = createFeatureSelector<NotificationState>(
  "notificationState"
);
