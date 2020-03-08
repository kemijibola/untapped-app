import { ImageEditRequest } from "../interfaces/media/image";
import { environment } from "../../../src/environments/environment.prod";

export function fetchImageObjectFromCloudFormation(
  key: string,
  editParams: ImageEditRequest
): string {
  const params = {
    bucket: environment.IMAGE_BUCKET,
    key: key,
    edits: editParams.edits
  };
  const strRequest = JSON.stringify(params);
  const encryptedRequest = btoa(strRequest);
  return `${environment.CLOUD_FORMATION_API}/${encryptedRequest}`;
}

export function fetchAudioArt(): string {
  return environment.ART_ALBUM_COVER;
}

export function fetchVideoArt(): string {
  return environment.ART_ALBUM_COVER;
}

export function fetchAudioItemFullPath(key: string): string {
  return `${environment.AUDIO_ACCELERATE_URL}/${key}`;
}

export function fetchVideoItemFullPath(key: string): string {
  return `${environment.VIDEO_ACCELERATE_URL}/${key}`;
}
