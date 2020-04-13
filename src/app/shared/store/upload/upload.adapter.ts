import { IProfile, UploadedItems } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

// export function selectUploadedItemsId(a: UploadedItems): string {
//   return a._id;
// }

export const adapter: EntityAdapter<any> = createEntityAdapter<UploadedItems>({
  // selectId: selectUploadedItemsId,
});

// export const {
//   selectIds: selectUploadedItemIds,
//   selectEntities: selectUploadedItemEntities,
//   selectAll: selectAllUploadedItem,
//   selectTotal: uploadedItemCount,
// } = adapter.getSelectors();
