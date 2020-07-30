import { MediaType, MediaItem } from "../user/portfolio";

export interface AppModal {
  id: string;
  modals: IModal[];
}

export interface MagnifierData {
  index: number;
  data: MediaItem[];
}

export interface IModal {
  index: number;
  name: string;
  display: ModalDisplay;
  viewMode?: ModalViewModel;
  contentType?: string;
  data?: any;
  modalCss: string;
  modalDialogCss: string;
  modalContentCss: string;
  showMagnifier: boolean;
}

export enum ModalDisplay {
  table = "table",
  none = "none",
}

export enum ModalViewModel {
  new = "new",
  edit = "edit",
  view = "view",
  none = "none",
}

export enum ModalContent {
  audio = "audio",
  image = "image",
  video = "video",
  form = "form",
  info = "info",
}
export interface NavigationData {
  currentIndex: number;
  mediaType: string;
  data?: any;
}
