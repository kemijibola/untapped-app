export interface IToggle {
  index: number;
  name: string;
  title: string;
  state: boolean;
}

export interface AppToggle {
  id: string;
  toggles: IToggle[];
}

export enum ToggleList {
  modaluploadtoggle = "modal-upload-toggle",
  settingstapnotification = "settings-tap-notification",
  settingsemailnotification = "settings-email-notification",
  settingsprofilevisibility = "settingsprofilevisibility",
}
