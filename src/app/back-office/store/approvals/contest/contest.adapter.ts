import { IContest } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectPendingContestId(a: IContest): string {
  return a._id;
}

export const adapter: EntityAdapter<IContest> = createEntityAdapter<IContest>({
  selectId: selectPendingContestId,
});

export const {
  selectIds: selectPendingContestIds,
  selectEntities: selectPendingContestEntities,
  selectAll: selectAllPendingContest,
  selectTotal: pendingContestCount,
} = adapter.getSelectors();
