import { SnackBarData } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectSnackBarId(a: SnackBarData): string {
  return a.id;
}

export const adapter: EntityAdapter<SnackBarData> = createEntityAdapter<
  SnackBarData
>({});

export const {
  selectEntities: selectSnackBarEntities,
  selectAll: selectAllSnackBars,
  selectTotal: snackbarCount
} = adapter.getSelectors();
