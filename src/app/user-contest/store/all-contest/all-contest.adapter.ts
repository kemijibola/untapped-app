import {
  IUserContest,
  IUserContestListAnalysis,
  AllContestViewModel,
} from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectUserContestId(a: AllContestViewModel): string {
  return a._id;
}

export const adapter: EntityAdapter<AllContestViewModel> = createEntityAdapter<
  AllContestViewModel
>({
  selectId: selectUserContestId,
});

export const {
  selectIds: selectAllContestIds,
  selectEntities: selectAllContestEntities,
  selectAll: selectAllUserContests,
  selectTotal: allContestCount,
} = adapter.getSelectors();
