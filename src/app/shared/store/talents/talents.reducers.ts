import {
  AudioPortfolioPreview,
  ImagePortfolioPreview,
  VideoPortfolioPreview,
  MediaType,
  TalentPortfolioPreview
} from "src/app/interfaces";
import * as TalentsAction from "./talents.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<TalentPortfolioPreview> {
  audioPortfolioPreview: AudioPortfolioPreview[];
  imagePortfolioPreview: ImagePortfolioPreview[];
  videoPortfolioPreview: VideoPortfolioPreview[];
}

export const talentPortfolioPreviewAdapter: EntityAdapter<TalentPortfolioPreview> = createEntityAdapter<
  TalentPortfolioPreview
>();

const initialState: State = talentPortfolioPreviewAdapter.getInitialState({
  audioPortfolioPreview: [],
  imagePortfolioPreview: [],
  videoPortfolioPreview: []
});

export function talentsReducer(
  state = initialState,
  action: TalentsAction.TalentsAction
): State {
  switch (action.type) {
    case TalentsAction.SET_TALENT_PORTFOLIO:
      const audioPortfolio = action.payload.filter(
        x => x.mediaType === MediaType.AUDIO.toLowerCase()
      );
      const imagePortfolio = action.payload.filter(
        x => x.mediaType === MediaType.IMAGE.toLowerCase()
      );
      const videoPortfolio = action.payload.filter(
        x => x.mediaType === MediaType.VIDEO.toLowerCase()
      );
      return talentPortfolioPreviewAdapter.setAll(action.payload, {
        ...state,
        audioPortfolioPreview: audioPortfolio,
        videoPortfolioPreview: videoPortfolio,
        imagePortfolioPreview: imagePortfolio
      });
    default:
      return state;
  }
}
