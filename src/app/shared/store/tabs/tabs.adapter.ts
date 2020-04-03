import { IAppTab } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectAppTabId(a: IAppTab): string {
  return a.id;
}

export const adapter: EntityAdapter<IAppTab> = createEntityAdapter<IAppTab>({
  selectId: selectAppTabId
});

export const {
  selectIds: selectAppTabIds,
  selectEntities: selectAppTabEntities,
  selectAll: selectAllAppTabs,
  selectTotal: appTabCount
} = adapter.getSelectors();
