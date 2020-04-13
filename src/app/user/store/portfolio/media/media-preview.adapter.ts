import { MediaPreview } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectMediaPreviewId(a: MediaPreview): string {
  return a._id;
}

export const adapter: EntityAdapter<MediaPreview> = createEntityAdapter<
  MediaPreview
>({
  selectId: selectMediaPreviewId,
});

export const {
  selectIds: selectMediaPreviewIds,
  selectEntities: selectMediaPreviewEntities,
  selectAll: selectAllMediaPreviews,
  selectTotal: mediaPreviewCount,
} = adapter.getSelectors();
