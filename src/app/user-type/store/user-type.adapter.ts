import { IUserType } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function sortByName(a: IUserType, b: IUserType): number {
  return a.name.localeCompare(b.name);
}

export function selectUserTypeId(a: IUserType): string {
  return a._id;
}

export const adapter: EntityAdapter<IUserType> = createEntityAdapter<IUserType>(
  {
    selectId: selectUserTypeId,
    sortComparer: sortByName,
  }
);

export const {
  selectIds: selectUserTypeIds,
  selectEntities: selectUserTypeEntities,
  selectAll: selectAllUserTypes,
  selectTotal: userTypeCount,
} = adapter.getSelectors();
