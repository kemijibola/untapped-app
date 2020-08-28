import { TalentProfile } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectPendingUserId(a: TalentProfile): string {
  return a.talentId;
}

export const adapter: EntityAdapter<TalentProfile> = createEntityAdapter<
  TalentProfile
>({
  selectId: selectPendingUserId,
});

export const {
  selectIds: selectPendingUsersIds,
  selectEntities: selectPendingUserEntities,
  selectAll: selectAllPendingUser,
  selectTotal: pendingUserCount,
} = adapter.getSelectors();
