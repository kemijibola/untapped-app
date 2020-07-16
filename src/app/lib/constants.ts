export const SOCIAL_MEDIAS = {
  TWITTER: "TWITTER",
  FACEBOOK: "FACEBOOK",
  INSTAGRAM: "INSTAGRAM",
  YOUTUBE: "YOUTUBE",
};

export enum ServiceTypes {
  Contest = "Contest",
  Vote = "Vote",
  ContactDetails = "ContactDetails",
}

export const PHONE_REGEX = /^\+?([0-9]+)\)?[-. ]?([0-9]+)\)?[-. ]?([0-9]+)[-. ]?([0-9]+)$/;
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const WEBSITE_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const NUMERIC_REGEX = /^[0-9]+$/;
export const CACNO_REGEX = /^rc[0-9]|bn[0-9]+$/;
export const ALPHABET_REGEX = "[a-zA-Z][a-zA-Z ]+";
