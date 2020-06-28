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
  selectedCategoryIndex = 0;
  index = 0;
  categories: OrderedCategory[] = [];
  allSelected: boolean = true;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .pipe(select(fromCategory.selectCategories))
      .subscribe((val: ICategory[]) => {
        // // val.unshift({
        // //   _id: "12346",
        // //   name: "All",
        // // });

        this.reOrderCategories(3, val);
        this.orderedCategories[0].selected = true;
      });
  }

  onNext() {
    // this.reOrderCategories(3, this.orderedCategories);
    this.store
      .pipe(select(fromCategory.selectCategories))
      .subscribe((val: ICategory[]) => {
        var shiftedArr = val.shift();
        val.push(shiftedArr);
        this.reOrderCategories(3, val);
      });
  }

  onSelectCategory(index: number) {
    if (index === -1) {
      this.allSelected = !this.allSelected;
      this.orderedCategories = this.orderedCategories.map(
        (x: OrderedCategory, i: number) => {
          return Object.assign({}, x, {
            selected: false,
          });
        }
      );
      return;
    }

    this.orderedCategories = this.orderedCategories.map(
      (x: OrderedCategory, i: number) => {
        this.allSelected = false;
        return Object.assign({}, x, {
          selected: i == index ? true : false,
        });
      }
    );
  }

  reOrderCategories(pick: number, categories: ICategory[]) {
    this.orderedCategories = categories.filter((x: ICategory, i: number) => {
      return i < pick;
    });
  }
}
