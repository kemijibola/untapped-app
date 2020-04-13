import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { AppNotification } from "src/app/interfaces";

export function selectNotificationId(a: AppNotification): string {
  return a.key;
}

export const adapter: EntityAdapter<AppNotification> = createEntityAdapter<
  AppNotification
>({
  selectId: selectNotificationId,
});

export const {
  selectIds: selectNotificationIds,
  selectEntities: selectNotificationEntities,
  selectAll: selectAllNotifications,
  selectTotal: notificationCount,
} = adapter.getSelectors();
