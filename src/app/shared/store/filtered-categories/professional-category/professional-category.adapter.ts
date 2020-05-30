import { ICategory, UserFilterCategory } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function sortProfessionalByDisplayName(
  a: UserFilterCategory,
  b: UserFilterCategory
): number {
  return a.displayName.localeCompare(b.displayName);
}

export function selectProfessionalId(a: UserFilterCategory): string {
  return a._id;
}

export const adapter: EntityAdapter<UserFilterCategory> = createEntityAdapter<
  UserFilterCategory
>({
  selectId: selectProfessionalId,
  sortComparer: sortProfessionalByDisplayName,
});

export const {
  selectIds: selectProfessionalIds,
  selectEntities: selectProfessionalEntities,
  selectAll: selectAllProfessionals,
  selectTotal: professionalCount,
} = adapter.getSelectors();
