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
  modalCss: string;
  modalDialogCss: string;
}
export enum ModalDisplay {
  table = "table",
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
