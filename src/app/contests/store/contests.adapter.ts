import { IContestList } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectContestPreviewId(a: IContestList): string {
  return a._id;
}

export const adapter: EntityAdapter<IContestList> = createEntityAdapter<
  IContestList
>({
  selectId: selectContestPreviewId,
});

export const {
  selectIds: selectContestPreviewIds,
  selectEntities: selectContestPreviewEntities,
  selectAll: selectAllContestPreviews,
  selectTotal: contestPreviewCount,
} = adapter.getSelectors();
