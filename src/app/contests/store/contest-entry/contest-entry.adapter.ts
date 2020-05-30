import { IContestEntry } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectContestEntryId(a: IContestEntry): string {
  return a._id;
}

export const adapter: EntityAdapter<IContestEntry> = createEntityAdapter<
  IContestEntry
>({
  selectId: selectContestEntryId,
});

export const {
  selectIds: selectContestEntryIds,
  selectEntities: selectContestEntryEntities,
  selectAll: selectAllContestEntries,
  selectTotal: contestEntryCount,
} = adapter.getSelectors();
