import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { ICategory, OrderedCategory } from "src/app/interfaces";
import * as fromCategory from "./../store/category/category.reducers";
import { UUID } from "angular2-uuid";

@Component({
  selector: "app-up-categery-search",
  templateUrl: "./up-categery-search.component.html",
  styleUrls: ["./up-categery-search.component.css"],
})
export class UpCategerySearchComponent implements OnInit {
  orderedCategories: OrderedCategory[] = [];
  selectedCategoryIndex: number;
  index = 0;
  categories: OrderedCategory[] = [];
  allSelected: boolean = true;
  selectedCategoryName: string = "all";
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .pipe(select(fromCategory.selectCategories))
      .subscribe((val: ICategory[]) => {
        this.reOrderCategories(3, val);
      });
  }

  onNext() {
    this.store
      .pipe(select(fromCategory.selectCategories))
      .subscribe((val: ICategory[]) => {
        var shiftedArr = val.shift();
        val.push(shiftedArr);
        this.reOrderCategories(3, val);
        this.onSelectCategory(0, this.selectedCategoryName);
      });
  }

  onSelectCategory(index: number, name: string) {
    this.selectedCategoryName = name;
    if (name === "all") {
      this.allSelected = true;
      this.orderedCategories = this.orderedCategories.map(
        (x: OrderedCategory, i: number) => {
          return Object.assign({}, x, {
            selected: false,
          });
        }
      );
    } else {
      this.orderedCategories = this.orderedCategories.map(
        (x: OrderedCategory, i: number) => {
          this.allSelected = false;
          return Object.assign({}, x, {
            selected: x.name === name ? true : false,
          });
        }
      );
    }
  }

  reOrderCategories(pick: number, categories: ICategory[]) {
    this.orderedCategories = categories.filter((x: ICategory, i: number) => {
      return i < pick;
    });
  }
}
