import { MatSnackBarConfig } from "@angular/material/snack-bar";

export interface SnackBarData {
  id?: string;
  message: string;
  action?: string;
  config?: MatSnackBarConfig;
}
