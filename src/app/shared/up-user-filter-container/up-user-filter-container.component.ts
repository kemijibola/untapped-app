import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { selectAllTalents } from "./../store/filtered-categories/user-category.selectors";
import { UserFilterCategory } from "src/app/interfaces";

@Component({
  selector: "app-up-user-filter-container",
  templateUrl: "./up-user-filter-container.component.html",
  styleUrls: ["./up-user-filter-container.component.css"]
})
export class UpUserFilterContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
