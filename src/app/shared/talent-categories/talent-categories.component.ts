import { Component, OnInit, ɵConsole } from "@angular/core";
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
  preSelectedIds: string[];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.loadCategories();

    this.store
      .pipe(select(selectSelectedCategoryTypes))
      .subscribe((val: string[]) => {
        if (val) {
          this.selectedItems = [];
          val.map(x => {
            const found = this.itemList.filter(y => y.id === x)[0];
            this.selectedItems = [
              ...this.selectedItems,
              {
                id: found.id,
                itemName: found.itemName
              }
            ];
          });
        }
      });
    // this.selectedItems = [
    //   {
    //     id: "5de9e29deec81309b00f2b96",
    //     itemName: "Public Speaking",
    //     category: "Mass Media"
    //   }
    // ];
    // this.setPreselectedCategories();
    this.applySettings();
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
      new CategoryTypeActions.SetSelectedCategoryType(this.selectCategoryIds)
    );
  }

  setPreselectedCategories() {
    this.store
      .pipe(select(selectSelectedCategoryTypes))
      .subscribe((val: string[]) => {
        if (val) {
          for (let id of val) {
            const found = this.itemList.filter(x => x.id === id)[0];
            if (found) {
              this.selectedItems.push({
                id: found.id,
                itemName: found.itemName,
                category: found.category
              });
            }
          }
        }
      });
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
      new CategoryTypeActions.SetSelectedCategoryType(this.selectCategoryIds)
    );
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
