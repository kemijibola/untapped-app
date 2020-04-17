import { IContest } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectContestId(a: IContest): string {
  return a._id;
}

export const adapter: EntityAdapter<IContest> = createEntityAdapter<IContest>({
  selectId: selectContestId,
});

export const {
  selectIds: selectContestIds,
  selectEntities: selectContestEntities,
  selectAll: selectAllContests,
  selectTotal: contestCount,
} = adapter.getSelectors();
