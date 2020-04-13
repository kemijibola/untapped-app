import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { AudioItem } from "src/app/interfaces";
import { VgMedia } from "videogular2/compiled/core";
import { VgAPI } from "ngx-videogular";

@Component({
  selector: "app-up-audio",
  templateUrl: "./up-audio.component.html",
  styleUrls: ["./up-audio.component.css"]
})
export class UpAudioComponent implements OnInit, OnChanges {
  @Input() currentAudioItem: AudioItem;
  api: VgAPI;
  audio: AudioItem = {
    _id: "",
    key: "",
    path: "",
    type: "",
    fullAudioPath: ""
  };
  constructor() {}

  ngOnInit() {}

  ngOnChanges(simple: SimpleChanges) {
    if (simple["currentAudioItem"]) {
      this.audio = { ...this.currentAudioItem };
      if (this.audio !== undefined) {
      }
    }
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
  }
}
