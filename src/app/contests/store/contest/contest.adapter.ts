import { ContestData } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectContestId(a: ContestData): string {
  return a.contest._id;
}

export const adapter: EntityAdapter<ContestData> = createEntityAdapter<
  ContestData
>({
  selectId: selectContestId,
});

export const {
  selectIds: selectContestIds,
  selectEntities: selectContestEntities,
  selectAll: selectAllContests,
  selectTotal: contestCount,
} = adapter.getSelectors();
