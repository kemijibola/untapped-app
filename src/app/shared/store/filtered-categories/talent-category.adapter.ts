import { ICategory, UserFilterCategory } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function sortTalentWithHighestCommentByDisplayName(
  a: UserFilterCategory,
  b: UserFilterCategory
): number {
  return a.displayName.localeCompare(b.displayName);
}

export function selectTalentWithHighestCommentId(
  a: UserFilterCategory
): string {
  return a._id;
}

export const adapter: EntityAdapter<UserFilterCategory> = createEntityAdapter<
  UserFilterCategory
>({
  selectId: selectTalentWithHighestCommentId,
  sortComparer: sortTalentWithHighestCommentByDisplayName,
});

export const {
  selectIds: selectTalentWithHighestCommentIds,
  selectEntities: selectTalentWithHighestCommentEntities,
  selectAll: selectAllTalentWithHighestComments,
  selectTotal: talentWithHighestCommentCount,
} = adapter.getSelectors();
