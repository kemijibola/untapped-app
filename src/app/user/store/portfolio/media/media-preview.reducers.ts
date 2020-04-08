import {
  MediaUploadType,
  MediaType,
  AudioPreview,
  VideoPreview,
  MediaPreview,
  ImagePreview,
} from "src/app/interfaces";
import * as MediaPreviewActions from "./media-preview.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./media-preview.adapter";
import { AppError } from "src/app/store/global/error/error.reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface MediaPreviewState extends EntityState<MediaPreview> {
  audioPreviews: AudioPreview[];
  videoPreviews: VideoPreview[];
  imagePreviews: ImagePreview[];
  mediaPreviewError: AppError | null;
  selectedMediaPreviewId: string | number | null;
}

const initialState: MediaPreviewState = fromAdapter.adapter.getInitialState({
  audioPreviews: [],
  imagePreviews: [],
  videoPreviews: [],
  selectedMediaPreviewId: null,
  mediaPreviewError: null,
});

export function mediaPreviewReducer(
  state = initialState,
  action: MediaPreviewActions.MediaPreviewActions
): MediaPreviewState {
  switch (action.type) {
    case MediaPreviewActions.DELETE_VIDEO_LIST_BY_ID_SUCCESS:
      let newVideoPreviews = state.imagePreviews.reduce(
        (x: VideoPreview[], y: VideoPreview) => {
          if (y._id != action.payload) {
            x.push(y);
          }
          return x;
        },
        []
      );
      return Object.assign({
        ...state,
        videoPreviews: newVideoPreviews,
      });
    case MediaPreviewActions.DELETE_AUDIO_LIST_BY_ID_SUCCESS:
      let newAudioPreviews = state.imagePreviews.reduce(
        (x: AudioPreview[], y: AudioPreview) => {
          if (y._id != action.payload) {
            x.push(y);
          }
          return x;
        },
        []
      );
      return Object.assign({
        ...state,
        audioPreviews: newAudioPreviews,
      });
    case MediaPreviewActions.DELETE_IMAGE_LIST_BY_ID_SUCCESS:
      let newImagePreviews = state.imagePreviews.reduce(
        (x: ImagePreview[], y: ImagePreview) => {
          if (y._id != action.payload) {
            x.push(y);
          }
          return x;
        },
        []
      );
      return Object.assign({
        ...state,
        imagePreviews: newImagePreviews,
      });
    case MediaPreviewActions.DELETE_IMAGE_LIST_BY_ID_ERROR:
      return Object.assign({
        ...state,
        mediaPreviewError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        }),
      });
    case MediaPreviewActions.DELETE_AUDIO_LIST_BY_ID_ERROR:
      return Object.assign({
        ...state,
        mediaPreviewError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        }),
      });
    case MediaPreviewActions.DELETE_VIDEO_LIST_BY_ID_ERROR:
      return Object.assign({
        ...state,
        mediaPreviewError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        }),
      });
    case MediaPreviewActions.SET_USER_AUDIO_PREVIEWS:
      return Object.assign({
        ...state,
        audioPreviews: action.payload,
      });
    case MediaPreviewActions.SET_USER_IMAGE_PREVIEWS:
      return Object.assign({
        ...state,
        imagePreviews: action.payload,
      });
    case MediaPreviewActions.SET_USER_VIDEO_PREVIEWS:
      return Object.assign({
        ...state,
        videoPreviews: action.payload,
      });
    case MediaPreviewActions.FETCH_USER_MEDIA_LIST_PREVIEW_ERROR:
      return Object.assign({
        ...state,
        mediaPreviewError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        }),
      });
    default: {
      return state;
    }
  }
}

const getSelectedMediaPreviewId = (state: MediaPreviewState) =>
  state.selectedMediaPreviewId;

const getMediaPreviewError = (state: MediaPreviewState) =>
  state.mediaPreviewError;

const getAudioPreviews = (state: MediaPreviewState) => state.audioPreviews;

const getImagePreviews = (state: MediaPreviewState) => state.imagePreviews;

const getVideoPreviews = (state: MediaPreviewState) => state.videoPreviews;

export const getMediaPreviewState = createFeatureSelector<MediaPreviewState>(
  "mediaPreviewState"
);

export const selectMediaPreviewIds = createSelector(
  getMediaPreviewState,
  fromAdapter.selectMediaPreviewIds
);

export const selectMediaPreviewEntities = createSelector(
  getMediaPreviewState,
  fromAdapter.selectMediaPreviewEntities
);

export const selectAllMediaPreviews = createSelector(
  getMediaPreviewState,
  fromAdapter.selectAllMediaPreviews
);
export const mediaPreviewCount = createSelector(
  getMediaPreviewState,
  fromAdapter.mediaPreviewCount
);

export const selectCurrentMediaPreviewId = createSelector(
  getMediaPreviewState,
  getSelectedMediaPreviewId
);

export const selectMediaPreviewError = createSelector(
  getMediaPreviewState,
  getMediaPreviewError
);

export const selectUserAudioPreviews = createSelector(
  getMediaPreviewState,
  getAudioPreviews
);

export const selectUserImagePreviews = createSelector(
  getMediaPreviewState,
  getImagePreviews
);

export const selectUserVideoPreviews = createSelector(
  getMediaPreviewState,
  getVideoPreviews
);
export const selectCurrentMediaPreview = createSelector(
  selectMediaPreviewEntities,
  selectCurrentMediaPreviewId,
  (mediaPreviewEntities, mediaPreviewId) => mediaPreviewEntities[mediaPreviewId]
);
