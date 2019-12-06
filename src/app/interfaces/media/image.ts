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
  fit: ImageFit;
}

interface SmartCrop {
  faceIndex: number;
  padding: number;
}
