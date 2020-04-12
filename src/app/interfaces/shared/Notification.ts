import { MatSnackBarConfig } from "@angular/material/snack-bar";

export interface SnackBarData {
  id?: string;
  message: string;
  action?: string;
  config?: MatSnackBarConfig;
}
export interface AppNotification {
  key: AppNotificationKey;
  code: number;
  message: string;
}

export enum AppNotificationKey {
  error = "error",
  info = "info",
  success = "success",
}
