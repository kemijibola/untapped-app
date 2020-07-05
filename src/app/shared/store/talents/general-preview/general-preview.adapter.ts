import { GeneralPreview, TalentPortfolioPreview } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectGeneralPreviewId(a: TalentPortfolioPreview): string {
  return a._id;
}

export const adapter: EntityAdapter<TalentPortfolioPreview> = createEntityAdapter<
  TalentPortfolioPreview
>({
  selectId: selectGeneralPreviewId,
});

export const {
  selectIds: selectGeneralPreviewIds,
  selectEntities: selectGeneralPreviewEntities,
  selectAll: selectAllGeneralPreview,
  selectTotal: generalPreviewCount,
} = adapter.getSelectors();
