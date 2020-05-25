export interface IToggle {
  name: string;
  title?: string;
  state?: boolean;
}

export enum ToggleList {
  modaluploadtoggle = "modal-upload-toggle",
  settingstapnotification = "settings-tap-notification",
  settingsemailnotification = "settings-email-notification",
  settingsprofilevisibility = "settings-profile-visibility",
}
