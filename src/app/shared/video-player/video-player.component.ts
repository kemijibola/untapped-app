import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { VideoItem } from "src/app/interfaces";
import * as _ from "underscore";
import { VgMedia } from "videogular2/compiled/core";
import { VgAPI } from "ngx-videogular";
import { fetchVideoItemFullPath } from "src/app/lib/Helper";

@Component({
  selector: "app-video-player",
  templateUrl: "./video-player.component.html",
  styleUrls: ["./video-player.component.css"],
})
export class VideoPlayerComponent implements OnInit, OnChanges {
  @Input() currentVideo: VideoItem;
  videoApi: VgAPI;
  isCurrentVideoSet: boolean;
  constructor() {}

  ngOnInit(): void {}

  onVideoPlayerReady(api: VgAPI) {
    this.videoApi = api;
  }

  ngOnChanges(simple: SimpleChanges) {
    if (simple["currentVideo"] && _.has(this.currentVideo, "path")) {
      this.isCurrentVideoSet = true;
      let video = Object.assign({}, this.currentVideo, {
        type: `video/${this.currentVideo.path.split(".").pop()}`,
        fullVideoPath: fetchVideoItemFullPath(this.currentVideo.path),
      });

      this.currentVideo = video;
      if (this.videoApi) (<VgMedia>this.videoApi.getDefaultMedia()).loadMedia();
    }
  }
}
