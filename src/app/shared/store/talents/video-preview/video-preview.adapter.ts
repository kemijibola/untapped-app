import { VideoPortfolioPreview } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectVideoPortfolioPreviewId(
  a: VideoPortfolioPreview
): string {
  return a._id;
}

export const adapter: EntityAdapter<VideoPortfolioPreview> = createEntityAdapter<
  VideoPortfolioPreview
>({
  selectId: selectVideoPortfolioPreviewId,
});

export const {
  selectIds: selectVideoPortfolioPreviewIds,
  selectEntities: selectVideoPortfolioPreviewEntities,
  selectAll: selectAllVideoPortfolioPreview,
  selectTotal: videoPortfolioPreviewCount,
} = adapter.getSelectors();
