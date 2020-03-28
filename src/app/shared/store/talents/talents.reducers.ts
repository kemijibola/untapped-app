import {
  AudioPortfolioPreview,
  ImagePortfolioPreview,
  VideoPortfolioPreview,
  MediaType
} from "src/app/interfaces";
import * as TalentsAction from "./talents.actions";

export interface State {
  audioPortfolioPreview: AudioPortfolioPreview[];
  imagePortfolioPreview: ImagePortfolioPreview[];
  videoPortfolioPreview: VideoPortfolioPreview[];
}

const initialState: State = {
  audioPortfolioPreview: [],
  imagePortfolioPreview: [],
  videoPortfolioPreview: []
};

export function talentsReducer(
  state = initialState,
  action: TalentsAction.TalentsAction
) {
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
      return {
        ...state,
        audioPortfolioPreview: [...audioPortfolio],
        imagePortfolioPreview: [...imagePortfolio],
        videoPortfolioPreview: [...videoPortfolio]
      };
    default:
      return state;
  }
}
