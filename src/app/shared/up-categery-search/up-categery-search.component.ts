import { selectCategories } from "./../store/category/category.selectors";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { ICategory } from "src/app/interfaces";

@Component({
  selector: "app-up-categery-search",
  templateUrl: "./up-categery-search.component.html",
  styleUrls: ["./up-categery-search.component.css"]
})
export class UpCategerySearchComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.pipe(select(selectCategories)).subscribe((val: ICategory[]) => {
      console.log(val);
    });
  }
}
