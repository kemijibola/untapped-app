import { CategoryType } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function sortByName(a: CategoryType, b: CategoryType): number {
  return a.name.localeCompare(b.name);
}

export function selectCategoryTypeId(a: CategoryType): string {
  return a._id;
}

export const adapter: EntityAdapter<CategoryType> = createEntityAdapter<
  CategoryType
>({
  selectId: selectCategoryTypeId,
  sortComparer: sortByName,
});

export const {
  selectIds: selectCategoryTypeIds,
  selectEntities: selectCategoryTypeEntities,
  selectAll: selectAllCategoryTypes,
  selectTotal: CategoryTypeCount,
} = adapter.getSelectors();
