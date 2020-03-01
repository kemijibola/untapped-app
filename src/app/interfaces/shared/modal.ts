export interface AppModal {
  component: string;
  modals: IModal[];
}

export interface IModal {
  index: number;
  name: string;
  display: ModalDisplay;
  viewMode?: ModalViewModel;
  contentType?: string;
  data?: any;
}
export enum ModalDisplay {
  block = "block",
  none = "none"
}

export enum ModalViewModel {
  new = "new",
  edit = "edit",
  none = "none"
}

export enum ModalContent {
  audio = "audio",
  image = "image",
  video = "video",
  form = "form",
  info = "info"
}
