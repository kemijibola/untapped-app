import { MediaUploadType } from "..";

export interface ImageEditRequest {
  edits?: {
    resize?: Resize;
    grayscale?: boolean;
    flip?: boolean;
    flop?: boolean;
    negate?: boolean;
    flatten?: boolean;
    normalise?: boolean;
    smartCrop?: SmartCrop;
  };
}

export enum ImageFit {
  disabled = "disabled",
  cover = "cover",
  contain = "contain",
  fill = "fill",
  inside = "inside",
  outside = "outside"
}
interface Resize {
  width: number;
  height: number;
  fit?: ImageFit;
}

interface SmartCrop {
  faceIndex: number;
  padding: number;
}

export const AcceptedMedias = {
  png: "image",
  jpeg: "image",
  jpg: "image",
  gif: "image",
  svg: "image",
  mp4: "video",
  mpeg: "video",
  avi: "video",
  flv: "video",
  mp3: "audio",
  wma: "audio",
  webm: "audio",
  wav: "audio",
  "3gp": "video",
  m4p: "audio",
  aac: "audio"
};
