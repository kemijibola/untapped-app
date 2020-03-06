// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: "ADMINWEB",
  TALENT_DEFAULT_IMG: "assets/img/profile/talent_default_img.png",
  BASE_URL: "http://127.0.0.1:8900/v1",
  IMAGE_BUCKET: "untapped-pool-image-bucket",
  CLOUD_FORMATION_API: "https://d7olhgwoyl909.cloudfront.net",
  S3BUCKET_OBJECT_URL:
    "https://untapped-pool-image-bucket.s3-accelerate.amazonaws.com",
  ART_ALBUM_COVER: "assets/img/profile/1950057_copy.png",
  AUDIO_ACCELERATE_URL:
    "https://untapped-pool-audio-bucket.s3.us-east-2.amazonaws.com",
  VIDEO_ACCELERATE_URL:
    "https://untapped-pool-video-bucket.s3-accelerate.amazonaws.com"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
