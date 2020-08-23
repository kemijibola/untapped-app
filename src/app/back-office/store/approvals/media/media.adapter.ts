import { IMedia } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectPendingMediaId(a: IMedia): string {
  return a._id;
}

export const adapter: EntityAdapter<IMedia> = createEntityAdapter<IMedia>({
  selectId: selectPendingMediaId,
});

export const {
  selectIds: selectPendingMediaIds,
  selectEntities: selectPendingMediaEntities,
  selectAll: selectAllPendingMedia,
  selectTotal: pendingMediaCount,
} = adapter.getSelectors();
