// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  clientId: "ADMINWEB",
  TALENT_DEFAULT_IMG: "assets/img/profile/talent_default_img.png",
  PROFESSIONAL_DEFAULT_IMG: "assets/img/profile/professional_default_img.png",
  NO_MEDIA_IMG: "assets/img/no-media.png",
  COMMENTER_DEFAULT_IMAGE: "assets/img/contest/popup-user.png",
  BASE_URL: "http://127.0.0.1:8900/v1",
  IMAGE_BUCKET: "untapped-pool-image-bucket",
  CLOUD_FORMATION_API: "https://d1tudbmrz1hh6d.cloudfront.net",
  S3BUCKET_OBJECT_URL:
    "https://untapped-pool-image-bucket.s3.us-east-2.amazonaws.com",
  ART_ALBUM_COVER: "assets/img/profile/audio-cover.jpg",
  VIDEO_ALBUM_COVER: "assets/img/profile/video-cover.jpg",
  AUDIO_ACCELERATE_URL:
    "https://untapped-pool-audio-bucket.s3.us-east-2.amazonaws.com",
  VIDEO_ACCELERATE_URL:
    "https://untapped-pool-video-bucket.s3.us-east-2-accelerate.amazonaws.com",
  PROFESSIONAL_BANNER_IMAGE_DEFAULT: "assets/img/profile/profile-3.jpg",
  PROFESSIONAL_BIODATA_BANNER_DEFAULT:
    "assets/img/profile/pro_banner_default.png",
  CONTEST_BANNER_DEFAULT: "assets/img/contest/contest-1.jpg",
  PAYSTACK_CLIENT_KEY: "pk_test_59348c251942c0500c9bf1058fdbd9956cadc060",
  EMAIL_CHANGE_ROUTE: "account/email-change/verify",
  RESET_PASSWORD_URL: "account/reset/password-request/verify",
  CONTEST_KEYWORD: "TALENT",
  CONTEST_TO_NUMBER: "32811",
  WS_ENDPOINT: "http://127.0.0.1:8900",
  PUSHER_KEY: "e45121c4036dc0400543",
  PUSHER_CLUSTER: "eu",
  PUSHER_CHANNEL: "untapped-pool-development",
  TERMS_CONDITION_LAST_DATE: "June 17, 2020",
  KEY: "311A35EAE8CEDB052F1E8533FE3DBC12",
  TALENT_USER_TYPE_ID: "5dcb700d625f0d6058704ef0",
  PROFESSIONAL_USER_TYPE_ID: "5dcb6ff6625f0d6058704eef",
  COMPETITION_TERMS_LAST_DATE: "July 13, 2020",
  PRIVACY_POLICY_LAST_DATE: "June 18, 2020",
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
