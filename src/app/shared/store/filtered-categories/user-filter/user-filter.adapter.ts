import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { UserFilterCategory } from "src/app/interfaces";

export function sortUser(a: UserFilterCategory, b: UserFilterCategory): number {
  return a.displayName.localeCompare(b.displayName);
}

export function selectUserId(a: UserFilterCategory): string {
  return a._id;
}

export const adapter: EntityAdapter<UserFilterCategory> = createEntityAdapter<
  UserFilterCategory
>({
  selectId: selectUserId,
  sortComparer: sortUser,
});

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: userCount,
} = adapter.getSelectors();
