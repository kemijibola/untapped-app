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
export const FACEBOOK_REGEX = /(?:(?:http|https):\/\/)?(?:www.|m.)?facebook.com\/(?!home.php)(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\.-]+)/;
export const INSTAGRAM_REGEX = /(?:(?:http|https):\/\/)?(?:www.|m.)?instagram.com\/(?!home.com)(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.com\?id=(?=\d.*))?([\w\.-]+)/;
export const TWITTER_REGEX = /(?:(?:http|https):\/\/)?(?:www.|m.)?twitter.com\/(?!home.com)(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.com\?id=(?=\d.*))?([\w\.-]+)/;
export const YOUTUBE_REGEX = /(?:(?:http|https):\/\/)?(?:www.|m.)?youtube.com\/(?!home.com)(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.com\?id=(?=\d.*))?([\w\.-]+)/;

export enum RolePermission {
  canViewPendingMedia = "canViewPendingMedia",
  canApproveMedia = "canApproveMedia",
  canRejectMedia = "canRejectMedia",
  canViewPendingContest = "canViewPendingContest",
}
