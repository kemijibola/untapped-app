import {
  MediaUploadType,
  MediaType,
  AudioPreview,
  VideoPreview,
  MediaPreview,
  ImagePreview
} from "src/app/interfaces";
import * as MediaPreviewActions from "./media-preview.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<MediaPreview> {
  audioPreviews: AudioPreview[];
  videoPreviews: VideoPreview[];
  imagePreviews: ImagePreview[];
}

export const mediaPreviewAdapter: EntityAdapter<MediaPreview> = createEntityAdapter<
  MediaPreview
>();

const initialState: State = mediaPreviewAdapter.getInitialState({
  audioPreviews: [],
  imagePreviews: [],
  videoPreviews: []
});

export function mediaPreviewReducer(
  state = initialState,
  action: MediaPreviewActions.MediaPreviewActions
): State {
  switch (action.type) {
    case MediaPreviewActions.SET_USER_MEDIA_LIST_PREVIEW:
      const userAudioPreviews = action.payload.filter(
        x => x.mediaType === MediaType.AUDIO.toLowerCase()
      );
      const userImagePreviews = action.payload.filter(
        x => x.mediaType === MediaType.IMAGE.toLowerCase()
      );
      const userVideoPreviews = action.payload.filter(
        x => x.mediaType === MediaType.VIDEO.toLowerCase()
      );
      return mediaPreviewAdapter.setAll(action.payload, {
        ...state,
        audioPreviews: userAudioPreviews,
        videoPreviews: userVideoPreviews,
        imagePreviews: userImagePreviews
      });
    default:
      return state;
  }
}
