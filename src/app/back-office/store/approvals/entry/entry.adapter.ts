import { IContestEntry } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectPendingEntryId(a: IContestEntry): string {
  return a._id;
}

export const adapter: EntityAdapter<IContestEntry> = createEntityAdapter<
  IContestEntry
>({
  selectId: selectPendingEntryId,
});

export const {
  selectIds: selectPendingEntryIds,
  selectEntities: selectPendingEntryEntities,
  selectAll: selectAllPendingEntry,
  selectTotal: pendingEntryCount,
} = adapter.getSelectors();
