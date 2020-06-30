import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { ICategory, OrderedCategory } from "src/app/interfaces";
import * as fromCategory from "./../store/category/category.reducers";
import * as CategoryActions from "./../store/category/category.action";
import * as UserFilterActions from "../store/filtered-categories/user-filter/user-filter.action";

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
  selectedCategoryId: string = "12345";
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
        this.onSelectCategory(0, this.selectedCategoryId);
      });
  }

  onSelectCategory(index: number, id: string) {
    this.selectedCategoryId = id;
    if (id === "12345") {
      this.allSelected = true;
      this.orderedCategories = this.orderedCategories.map(
        (x: OrderedCategory, i: number) => {
          return Object.assign({}, x, {
            selected: false,
          });
        }
      );
    } else {
      this.store.dispatch(
        new CategoryActions.FetchCategory({ categoryId: id })
      );

      this.orderedCategories = this.orderedCategories.map(
        (x: OrderedCategory, i: number) => {
          this.allSelected = false;
          return Object.assign({}, x, {
            selected: x._id === id ? true : false,
          });
        }
      );
    }

    //
  }

  reOrderCategories(pick: number, categories: ICategory[]) {
    this.orderedCategories = categories.filter((x: ICategory, i: number) => {
      return i < pick;
    });
  }
}
