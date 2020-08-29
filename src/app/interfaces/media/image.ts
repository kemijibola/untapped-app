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
  outside = "outside",
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
  audio: "audio",
  video: "video",
  image: "image",
};

export const MediaTypeExtension = {
  audio:
    ".mpeg, .opus, .flac, .webm, .weba, .wav, .ogg, .m4a, .mp3, .oga, .mid, .amr, .aiff, .wma, .au, .aac",
  image:
    ".tiff, .pjp, .jfif, .gif, .svg, .bmp, .png, .jpeg, .svgz, .jpg, .webp, .ico, .xbm, .dib, .tif, .pjpeg, .avif",
  video: ".ogm, .wmv, .mpg, .webm, .ogv, .mov, .asx, .mpeg, .mp4, .m4v, .avi",
};
