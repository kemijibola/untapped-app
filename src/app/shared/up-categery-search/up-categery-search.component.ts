import { selectCategories } from "./../store/category/category.selectors";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { ICategory, OrderedCategory } from "src/app/interfaces";

@Component({
  selector: "app-up-categery-search",
  templateUrl: "./up-categery-search.component.html",
  styleUrls: ["./up-categery-search.component.css"]
})
export class UpCategerySearchComponent implements OnInit {
  orderedCategories: OrderedCategory[] = [];
  selectedCategoryIndex = 0;
  index = 0;
  categories: OrderedCategory[] = [];
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.pipe(select(selectCategories)).subscribe((val: ICategory[]) => {
      this.reOrderCategories(3, val);
    });
  }

  onNext() {
    this.store.pipe(select(selectCategories)).subscribe((val: ICategory[]) => {
      var shiftedArr = val.shift();
      val.push(shiftedArr);
      this.reOrderCategories(3, val);
    });
  }

  onSelectCategory(index: number) {
    this.orderedCategories.map((x: OrderedCategory, i: number) => {
      if (i === index) {
        x.selected = true;
      } else {
        x.selected = false;
      }
    });
    // console.log(this.orderedCategories[index]);
  }

  reOrderCategories(pick: number, categories: ICategory[]) {
    this.orderedCategories = categories.filter((x: ICategory, i: number) => {
      return i < pick;
    });
  }
}
