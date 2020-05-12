import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { IEntryData } from "src/app/interfaces";

@Component({
  selector: "app-entry-list",
  templateUrl: "./entry-list.component.html",
  styleUrls: ["./entry-list.component.css"],
})
export class EntryListComponent implements OnInit {
  @Input() contestEntry: IEntryData;

  constructor() {}

  ngOnInit(): void {}

  // ngOnChanges(simple: SimpleChanges){
  //   if (simple["contestEntry"]) {
  //     this.en
  //   }

  // }
}
