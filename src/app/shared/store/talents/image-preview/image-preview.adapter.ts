import { ImagePortfolioPreview } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectImagePortfolioPreviewId(
  a: ImagePortfolioPreview
): string {
  return a._id;
}

export const adapter: EntityAdapter<ImagePortfolioPreview> = createEntityAdapter<
  ImagePortfolioPreview
>({
  selectId: selectImagePortfolioPreviewId,
});

export const {
  selectIds: selectImagePortfolioPreviewIds,
  selectEntities: selectImagePortfolioPreviewEntities,
  selectAll: selectAllImagePortfolioPreview,
  selectTotal: imagePortfolioPreviewCount,
} = adapter.getSelectors();
