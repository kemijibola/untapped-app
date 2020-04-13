import { ICategory } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function sortByName(a: ICategory, b: ICategory): number {
  return a.name.localeCompare(b.name);
}

export function selectCategoryId(a: ICategory): string {
  return a._id;
}

export const adapter: EntityAdapter<ICategory> = createEntityAdapter<ICategory>(
  {
    selectId: selectCategoryId,
    sortComparer: sortByName,
  }
);

export const {
  selectIds: selectCategoryIds,
  selectEntities: selectCategoryEntities,
  selectAll: selectAllCategories,
  selectTotal: categoryCount,
} = adapter.getSelectors();
