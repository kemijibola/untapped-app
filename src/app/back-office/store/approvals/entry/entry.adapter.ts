import { IContestEntryDetails } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectPendingEntryId(a: IContestEntryDetails): string {
  return a._id;
}

export const adapter: EntityAdapter<IContestEntryDetails> = createEntityAdapter<
  IContestEntryDetails
>({
  selectId: selectPendingEntryId,
});

export const {
  selectIds: selectPendingEntryIds,
  selectEntities: selectPendingEntryEntities,
  selectAll: selectAllPendingEntry,
  selectTotal: pendingEntryCount,
} = adapter.getSelectors();
