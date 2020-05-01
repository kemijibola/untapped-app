import { ImageEditRequest } from "../interfaces/media/image";
import { environment } from "../../../src/environments/environment.prod";
import { ContestService } from "../services/contest.service";
import { FormControl } from "@angular/forms";
import { timer, Observable } from "rxjs";
import { map, concatMap } from "rxjs/operators";
import { IContest, IResult } from "../interfaces";

export function fetchImageObjectFromCloudFormation(
  key: string,
  editParams: ImageEditRequest
): string {
  const params = {
    bucket: environment.IMAGE_BUCKET,
    key: key,
    edits: editParams.edits,
  };
  const strRequest = JSON.stringify(params);
  const encryptedRequest = btoa(strRequest);
  return `${environment.CLOUD_FORMATION_API}/${encryptedRequest}`;
}

export function fetchNoMediaDefaultImage(): string {
  return environment.NO_MEDIA_IMG;
}

export function fetchDefaultContestBanner(): string {
  return environment.CONTEST_BANNER_DEFAULT;
}

export function getTime(date?: Date) {
  return date != null ? new Date(date).getTime() : 0;
}

export function fetchCommenterDefaultImage(): string {
  return environment.COMMENTER_DEFAULT_IMAGE;
}
export function fetchAudioArt(): string {
  return environment.ART_ALBUM_COVER;
}

export function fetchVideoArt(): string {
  return environment.ART_ALBUM_COVER;
}

export function fetchOriginalImage(key): string {
  return `${environment.S3BUCKET_OBJECT_URL}/${key}`;
}
export function fetchAudioItemFullPath(key: string): string {
  return `${environment.AUDIO_ACCELERATE_URL}/${key}`;
}

export function fetchVideoItemFullPath(key: string): string {
  return `${environment.VIDEO_ACCELERATE_URL}/${key}`;
}

export function contestTitleAsyncValidator(
  time: number = 500,
  contestService: ContestService
) {
  return (input: FormControl): Observable<any> | Promise<any> => {
    return timer(time).pipe(
      concatMap(() => contestService.findContestByTitle(input.value)),
      map((res: IResult<IContest[]>) => {
        return res.data.length === 0 ? null : { titleExist: true };
      })
    );
  };
}
