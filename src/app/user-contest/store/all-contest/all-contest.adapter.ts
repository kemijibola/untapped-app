import { IUserContest, IUserContestListAnalysis } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectUserContestId(a: IUserContestListAnalysis): string {
  return a.contestId;
}

export const adapter: EntityAdapter<IUserContestListAnalysis> = createEntityAdapter<
  IUserContestListAnalysis
>({
  selectId: selectUserContestId,
});

export const {
  selectIds: selectAllContestIds,
  selectEntities: selectAllContestEntities,
  selectAll: selectAllUserContests,
  selectTotal: allContestCount,
} = adapter.getSelectors();
