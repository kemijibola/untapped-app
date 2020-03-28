import { Input, OnChanges, SimpleChanges } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-up-image",
  templateUrl: "./up-image.component.html",
  styleUrls: ["./up-image.component.css"]
})
export class UpImageComponent implements OnInit, OnChanges {
  @Input() defaultImagePath: string;
  @Input() altText: string;
  imagePath: string = "";
  altTxt: string = "";
  constructor() {}

  ngOnInit() {}

  ngOnChanges(simple: SimpleChanges) {
    if (simple["defaultImagePath"]) {
      this.imagePath = this.defaultImagePath;
    }
    if (simple["altText"]) {
      this.altText = this.altText;
    }
  }
}
