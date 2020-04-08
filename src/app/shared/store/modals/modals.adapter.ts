import { AppModal } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectAppModalId(a: AppModal): string {
  return a.id;
}

export const adapter: EntityAdapter<AppModal> = createEntityAdapter<AppModal>({
  selectId: selectAppModalId,
});

export const {
  selectIds: selectAppModalsIds,
  selectEntities: selectAppModalsEntities,
  selectAll: selectAllAppModals,
  selectTotal: appModalCount,
} = adapter.getSelectors();
