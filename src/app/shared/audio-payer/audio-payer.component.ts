import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from "@angular/core";
import { AudioItem } from "src/app/interfaces";
import { VgMedia } from "videogular2/compiled/core";
import { VgAPI } from "ngx-videogular";
import { fetchAudioItemFullPath } from "src/app/lib/Helper";
import * as _ from "underscore";

@Component({
  selector: "app-audio-payer",
  templateUrl: "./audio-payer.component.html",
  styleUrls: ["./audio-payer.component.css"],
})
export class AudioPayerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() currentAudio: AudioItem;
  @Input() height: number;
  @Input() width: number;
  audioApi: VgAPI;
  currentAudioIndex = 0;
  isCurrentAudioSet: boolean;
  constructor() {}

  ngOnInit() {}

  onAudioPlayerReady(api: VgAPI) {
    this.audioApi = api;
  }

  ngOnChanges(simple: SimpleChanges) {
    if (simple["currentAudio"] && _.has(this.currentAudio, "path")) {
      this.isCurrentAudioSet = true;
      let audio = Object.assign({}, this.currentAudio, {
        type: `audio/${this.currentAudio.path.split(".").pop()}`,
        fullAudioPath: fetchAudioItemFullPath(this.currentAudio.path),
      });

      this.currentAudio = audio;
      if (this.audioApi) (<VgMedia>this.audioApi.getDefaultMedia()).loadMedia();
    }
  }

  ngOnDestroy() {
    if (this.audioApi) {
      // (<VgMedia>this.audioApi.getDefaultMedia()).pause();
      // this.audioApi = null;
      // console.log("called");
    }
  }
}
