import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-up-search",
  templateUrl: "./up-search.component.html",
  styleUrls: ["./up-search.component.css"]
})
export class UpSearchComponent implements OnInit, OnChanges {
  @Input() placeholderText: string;
  placeholder = "";
  constructor() {}

  ngOnInit() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges["placeholderText"]) {
      this.placeholder = this.placeholderText;
    }
  }
}
