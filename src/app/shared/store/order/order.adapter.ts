import { IOrder } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectOrderId(a: IOrder): string {
  return a._id;
}

export const adapter: EntityAdapter<IOrder> = createEntityAdapter<IOrder>({
  selectId: selectOrderId,
});

export const {
  selectIds: selectOrderIds,
  selectEntities: selectOrderEntities,
  selectAll: selectAllOrders,
  selectTotal: orderCount,
} = adapter.getSelectors();
