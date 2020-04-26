import { IService } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function sortByName(a: IService, b: IService): number {
  return a.name.localeCompare(b.name);
}

export function selectServiceId(a: IService): string {
  return a._id;
}

export const adapter: EntityAdapter<IService> = createEntityAdapter<IService>({
  selectId: selectServiceId,
  sortComparer: sortByName,
});

export const {
  selectIds: selectServiceIds,
  selectEntities: selectServiceEntities,
  selectAll: selectAllServices,
  selectTotal: serviceCount,
} = adapter.getSelectors();
