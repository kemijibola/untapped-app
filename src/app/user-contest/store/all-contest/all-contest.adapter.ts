import { IUserContest } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectUserContestId(a: IUserContest): string {
  return a._id;
}

export const adapter: EntityAdapter<IUserContest> = createEntityAdapter<
  IUserContest
>({
  selectId: selectUserContestId,
});

export const {
  selectIds: selectAllContestIds,
  selectEntities: selectAllContestEntities,
  selectAll: selectAllUserContests,
  selectTotal: allContestCount,
} = adapter.getSelectors();
