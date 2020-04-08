import { AppToggle } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectAppToggleId(a: AppToggle): string {
  return a.id;
}

export const adapter: EntityAdapter<AppToggle> = createEntityAdapter<AppToggle>(
  {
    selectId: selectAppToggleId,
  }
);

export const {
  selectIds: selectAppToggleIds,
  selectEntities: selectAppToggleEntities,
  selectAll: selectAllAppToggle,
  selectTotal: appToggleCount,
} = adapter.getSelectors();
