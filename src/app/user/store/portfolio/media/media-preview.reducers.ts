import {
  MediaUploadType,
  MediaType,
  AudioPreview,
  VideoPreview,
  MediaPreview,
  ImagePreview,
  GeneralPreview,
} from "src/app/interfaces";
import * as MediaPreviewActions from "./media-preview.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./media-preview.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OutboundState } from "src/app/shared/Util";

export interface MediaPreviewState extends EntityState<MediaPreview> {
  audioPreviews: AudioPreview[];
  videoPreviews: VideoPreview[];
  imagePreviews: ImagePreview[];
  generalPreviews: GeneralPreview[];
  selectedMediaPreviewId: string | number | null;
  userMediaListCount: number;
  mediaPreviewStatus: OutboundState | null;
  generalPreviewStatus: OutboundState | null;
}

const initialState: MediaPreviewState = fromAdapter.adapter.getInitialState({
  audioPreviews: [],
  imagePreviews: [],
  videoPreviews: [],
  generalPreviews: [],
  selectedMediaPreviewId: null,
  userMediaListCount: 0,
  mediaPreviewStatus: OutboundState.initiated,
  generalPreviewStatus: OutboundState.initiated,
});

export function mediaPreviewReducer(
  state = initialState,
  action: MediaPreviewActions.MediaPreviewActions
): MediaPreviewState {
  switch (action.type) {
    case MediaPreviewActions.FETCH_USER_MEDIA_LIST_PREVIEW:
      return Object.assign({
        ...state,
        mediaPreviewStatus: OutboundState.inprogress,
      });
    case MediaPreviewActions.FETCH_USER_GENERAL_LIST_PREVIEW:
      return Object.assign({
        ...state,
        generalPreviewStatus: OutboundState.inprogress,
      });
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
        mediaPreviewStatus: OutboundState.completed,
      });
    case MediaPreviewActions.SET_USER_GENERAL_PREVIEWS:
      return Object.assign({
        ...state,
        generalPreviews: action.payload.generalPreviews,
        generalPreviewStatus: OutboundState.completed,
      });
    case MediaPreviewActions.SET_USER_IMAGE_PREVIEWS:
      return Object.assign({
        ...state,
        imagePreviews: action.payload,
        mediaPreviewStatus: OutboundState.completed,
      });
    case MediaPreviewActions.SET_USER_VIDEO_PREVIEWS:
      return Object.assign({
        ...state,
        videoPreviews: action.payload,
        mediaPreviewStatus: OutboundState.completed,
      });
    case MediaPreviewActions.FETCH_USER_MEDIA_LIST_PREVIEW_ERROR:
      return Object.assign({
        ...state,
        mediaPreviewStatus: OutboundState.failed,
      });
    case MediaPreviewActions.FETCH_USER_GENERAL_LIST_PREVIEW_ERROR:
      return Object.assign({
        ...state,
        generalPreviewStatus: OutboundState.failed,
      });
    default:
      return state;
  }
}

const getSelectedMediaPreviewId = (state: MediaPreviewState) =>
  state.selectedMediaPreviewId;

const getAudioPreviews = (state: MediaPreviewState) => state.audioPreviews;

const getImagePreviews = (state: MediaPreviewState) => state.imagePreviews;

const getVideoPreviews = (state: MediaPreviewState) => state.videoPreviews;

const getGeneralPreviews = (state: MediaPreviewState) => state.generalPreviews;

const getUserMediaListCount = (state: MediaPreviewState) =>
  state.userMediaListCount;

export const getMediaPreviewState = createFeatureSelector<MediaPreviewState>(
  "mediaPreviewState"
);

export const selectMediaPreviewIds = createSelector(
  getMediaPreviewState,
  fromAdapter.selectMediaPreviewIds
);

const getMediaPreviewCompleted = (state: MediaPreviewState): boolean =>
  state.mediaPreviewStatus === OutboundState.completed;

const getMediaPreviewInProgress = (state: MediaPreviewState): boolean =>
  state.mediaPreviewStatus === OutboundState.inprogress;

const getMediaPreviewInitiated = (state: MediaPreviewState): boolean =>
  state.mediaPreviewStatus === OutboundState.initiated;

const getMediaPreviewFailure = (state: MediaPreviewState): boolean =>
  state.mediaPreviewStatus === OutboundState.failed;

const getGeneralPreviewCompleted = (state: MediaPreviewState): boolean =>
  state.generalPreviewStatus === OutboundState.completed;

const getGeneralPreviewInProgress = (state: MediaPreviewState): boolean =>
  state.generalPreviewStatus === OutboundState.inprogress;

const getGeneralPreviewInitiated = (state: MediaPreviewState): boolean =>
  state.generalPreviewStatus === OutboundState.initiated;

const getGeneralPreviewFailure = (state: MediaPreviewState): boolean =>
  state.generalPreviewStatus === OutboundState.failed;

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

export const selectUserGeneralPreviews = createSelector(
  getMediaPreviewState,
  getGeneralPreviews
);

export const selectUserVideoPreviews = createSelector(
  getMediaPreviewState,
  getVideoPreviews
);

export const selectMediaPreviewInProgressStatus = createSelector(
  getMediaPreviewState,
  getMediaPreviewInProgress
);

export const selectMediaPreviewCompletedStatus = createSelector(
  getMediaPreviewState,
  getMediaPreviewCompleted
);

export const selectMediaPreviewInitiatedStatus = createSelector(
  getMediaPreviewState,
  getMediaPreviewInitiated
);

export const selectMediaPreviewFailedStatus = createSelector(
  getMediaPreviewState,
  getMediaPreviewFailure
);

export const selectGeneralPreviewInProgressStatus = createSelector(
  getMediaPreviewState,
  getGeneralPreviewInProgress
);

export const selectGeneralPreviewCompletedStatus = createSelector(
  getMediaPreviewState,
  getGeneralPreviewCompleted
);

export const selectGeneralPreviewInitiatedStatus = createSelector(
  getMediaPreviewState,
  getGeneralPreviewInitiated
);

export const selectGeneralPreviewFailedStatus = createSelector(
  getMediaPreviewState,
  getGeneralPreviewFailure
);
export const selectCurrentMediaPreview = createSelector(
  selectMediaPreviewEntities,
  selectCurrentMediaPreviewId,
  (mediaPreviewEntities, mediaPreviewId) => mediaPreviewEntities[mediaPreviewId]
);
