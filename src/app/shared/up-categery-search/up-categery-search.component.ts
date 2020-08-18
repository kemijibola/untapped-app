import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { ICategory, OrderedCategory } from "src/app/interfaces";
import * as fromCategory from "./../store/category/category.reducers";
import * as CategoryActions from "./../store/category/category.action";
import * as UserFilterActions from "../store/filtered-categories/user-filter/user-filter.action";
import * as fromUserFilter from "../store/filtered-categories/user-filter/user-filter.reducer";

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
  searchText: string = "";
  @Input() userTypeId: string = "";
  nextClicked: boolean;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new CategoryActions.FetchCategories());

    this.store
      .pipe(select(fromUserFilter.selectSearchText))
      .subscribe((val: string) => {
        if (val) {
          this.searchText = val;
        } else {
          this.searchText = "";
        }
      });
    this.store
      .pipe(select(fromCategory.selectCategories))
      .subscribe((val: ICategory[]) => {
        this.reOrderCategories(3, val);
      });
  }

  onNext() {
    this.nextClicked = true;
    this.store
      .pipe(select(fromCategory.selectCategories))
      .subscribe((val: ICategory[]) => {
        var shiftedArr = val.shift();
        val.push(shiftedArr);
        this.reOrderCategories(3, val);
        this.onSelectCategory(0, this.selectedCategoryId, false);
      });
  }

  onSelectCategory(index: number, id: string, fetchData: boolean) {
    this.selectedCategoryId = id;
    if (id === "12345") {
      this.allSelected = true;
      if (fetchData) {
        this.store.dispatch(
          new UserFilterActions.FetchAllUsers({
            queryParams: {
              searchText: this.searchText,
              userTypeId: this.userTypeId,
            },
          })
        );
      }
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

      if (fetchData) {
        this.store.dispatch(
          new UserFilterActions.FetchAllUsers({
            queryParams: {
              searchText: this.searchText,
              categoryId: id,
              userTypeId: this.userTypeId,
            },
          })
        );
      }
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
