import { IToggle } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectAppToggleId(a: IToggle): string {
  return a.name;
}

export const adapter: EntityAdapter<IToggle> = createEntityAdapter<IToggle>({
  selectId: selectAppToggleId,
});

export const {
  selectIds: selectAppToggleIds,
  selectEntities: selectAppToggleEntities,
  selectAll: selectAllAppToggle,
  selectTotal: appToggleCount,
} = adapter.getSelectors();
