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
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface MediaPreviewState extends EntityState<MediaPreview> {
  audioPreviews: AudioPreview[];
  videoPreviews: VideoPreview[];
  imagePreviews: ImagePreview[];
  selectedMediaPreviewId: string | number | null;
  userMediaListCount: number;
}

const initialState: MediaPreviewState = fromAdapter.adapter.getInitialState({
  audioPreviews: [],
  imagePreviews: [],
  videoPreviews: [],
  selectedMediaPreviewId: null,
  userMediaListCount: 0,
});

export function mediaPreviewReducer(
  state = initialState,
  action: MediaPreviewActions.MediaPreviewActions
): MediaPreviewState {
  switch (action.type) {
    case MediaPreviewActions.DELETE_VIDEO_LIST_BY_ID_SUCCESS:
      let newVideoPreviews = [...state.imagePreviews];
      newVideoPreviews = newVideoPreviews.reduce(
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
      let newAudioPreviews = [...state.audioPreviews];
      newAudioPreviews = newAudioPreviews.reduce(
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
      let newImagePreviews = [...state.imagePreviews];
      newImagePreviews = newImagePreviews.reduce(
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
    case MediaPreviewActions.USER_MEDIA_LIST_COUNT:
      return Object.assign({
        ...state,
        userMediaListCount: action.payload,
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
    default: {
      return state;
    }
  }
}

const getSelectedMediaPreviewId = (state: MediaPreviewState) =>
  state.selectedMediaPreviewId;

const getAudioPreviews = (state: MediaPreviewState) => state.audioPreviews;

const getImagePreviews = (state: MediaPreviewState) => state.imagePreviews;

const getVideoPreviews = (state: MediaPreviewState) => state.videoPreviews;

const getUserMediaListCount = (state: MediaPreviewState) =>
  state.userMediaListCount;

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

export const selectUserMediaListCount = createSelector(
  getMediaPreviewState,
  getUserMediaListCount
);

export const selectCurrentMediaPreviewId = createSelector(
  getMediaPreviewState,
  getSelectedMediaPreviewId
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
