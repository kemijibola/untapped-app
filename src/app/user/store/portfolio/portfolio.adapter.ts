import { IMedia } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectMediaId(a: IMedia): string {
  return a._id;
}

export const adapter: EntityAdapter<IMedia> = createEntityAdapter<IMedia>({
  selectId: selectMediaId,
});

export const {
  selectIds: selectMediaIds,
  selectEntities: selectMediaEntities,
  selectAll: selectAllMedias,
  selectTotal: mediaCount,
} = adapter.getSelectors();
