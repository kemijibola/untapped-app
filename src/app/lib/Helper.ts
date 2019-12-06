import { ImageEditRequest } from "../interfaces/media/image";
import { environment } from "../../../src/environments/environment.prod";

export function fetchObjectFromCloudFormation(
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
