import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import {
  selectCategoryTypes,
  selectSelectedCategoryTypes
} from "../store/category-type/category-type.selectors";
import * as CategoryTypeActions from "../store/category-type/category-type.actions";
import { CategoryType } from "src/app/interfaces";

@Component({
  selector: "app-talent-categories",
  templateUrl: "./talent-categories.component.html",
  styleUrls: ["./talent-categories.component.css"]
})
export class TalentCategoriesComponent implements OnInit {
  itemList = [];
  selectedItems = [];
  settings = {};
  selectCategoryIds: string[];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.loadCategories();
    this.applySettings();

    // this.store
    //   .pipe(select(selectSelectedCategoryTypes))
    //   .subscribe((val: string[]) => {
    //     console.log("selected categories", val);
    //   });
  }

  loadCategories() {
    this.store
      .pipe(select(selectCategoryTypes))
      .subscribe((val: CategoryType[]) => {
        if (val.length > 0) {
          val.map(x => {
            this.itemList.push({
              id: x._id,
              itemName: x.name,
              category: x.category.name
            });
          });
        }
      });
  }

  applySettings() {
    this.settings = {
      singleSelection: false,
      text: "Select Category",
      searchPlaceholderText: "Search Category",
      enableSearchFilter: true,
      limitSelection: 5,
      badgeShowLimit: 5,
      groupBy: "category"
    };
  }
  onItemSelect(item: any) {
    this.setSelectedCategory();

    this.store.dispatch(
      new CategoryTypeActions.SetSelectedCategories(this.selectCategoryIds)
    );
  }

  setSelectedCategory() {
    this.selectCategoryIds = this.selectedItems.reduce((theMap, theItem) => {
      theMap.push(theItem.id);
      return theMap;
    }, []);
  }

  OnItemDeSelect(item: any) {
    // console.log(item);
    // console.log(this.selectedItems);

    this.setSelectedCategory();
    this.store.dispatch(
      new CategoryTypeActions.SetSelectedCategories(this.selectCategoryIds)
    );
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
