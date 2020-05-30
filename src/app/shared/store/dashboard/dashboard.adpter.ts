import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { ContestWithEntriesPreview } from "src/app/interfaces/shared/dashboard";

export function sortByName(
  a: ContestWithEntriesPreview,
  b: ContestWithEntriesPreview
): number {
  return a.contest._id.localeCompare(b.contest._id);
}

export function selectRunningContestId(a: ContestWithEntriesPreview): string {
  return a.contest._id;
}

export const adapter: EntityAdapter<ContestWithEntriesPreview> = createEntityAdapter<
  ContestWithEntriesPreview
>({
  selectId: selectRunningContestId,
  sortComparer: sortByName,
});

export const {
  selectIds: selectRunningContestIds,
  selectEntities: selectRunningContestEntities,
  selectAll: selectAllRunningContests,
  selectTotal: runningContestCount,
} = adapter.getSelectors();
