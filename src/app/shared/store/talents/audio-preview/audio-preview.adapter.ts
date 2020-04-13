import { AudioPortfolioPreview } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectAudioPortfolioPreviewId(
  a: AudioPortfolioPreview
): string {
  return a._id;
}

export const adapter: EntityAdapter<AudioPortfolioPreview> = createEntityAdapter<
  AudioPortfolioPreview
>({
  selectId: selectAudioPortfolioPreviewId,
});

export const {
  selectIds: selectAudioPortfolioPreviewIds,
  selectEntities: selectAudioPortfolioPreviewEntities,
  selectAll: selectAllAudioPortfolioPreview,
  selectTotal: audioPortfolioPreviewCount,
} = adapter.getSelectors();
