import { IContest } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectUserContestId(a: IContest): string {
  return a._id;
}

export const adapter: EntityAdapter<IContest> = createEntityAdapter<IContest>({
  selectId: selectUserContestId,
});

export const {
  selectIds: selectUserContestIds,
  selectEntities: selectUserContestEntities,
  selectAll: selectAllUserContests,
  selectTotal: userContestCount,
} = adapter.getSelectors();
