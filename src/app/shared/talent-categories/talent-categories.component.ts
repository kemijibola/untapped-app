import { Component, OnInit, ɵConsole, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromCategoryType from "../store/category-type/category-type.reducers";
import * as CategoryTypeActions from "../store/category-type/category-type.actions";
import { CategoryType } from "src/app/interfaces";
import * as CategoryActions from "../store/category/category.action";

@Component({
  selector: "app-talent-categories",
  templateUrl: "./talent-categories.component.html",
  styleUrls: ["./talent-categories.component.css"],
})
export class TalentCategoriesComponent implements OnInit {
  itemList = [];
  selectedItems = [];
  settings = {};
  selectCategoryIds: string[];
  preSelectedIds: string[];
  @Input() text: string = "";
  @Input() placeholderText: string = "";

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    //  this.store.dispatch(new CategoryActions.FetchCategories());
    // this.store.dispatch(new CategoryTypeActions.FetchCategoryTypes());

    this.loadCategories();

    this.store
      .pipe(select(fromCategoryType.selectSelectedCategoryTypes))
      .subscribe((val: string[]) => {
        if (val.length > 0) {
          this.selectedItems = [];
          val.map((x) => {
            const found = this.itemList.filter((y) => y.id === x)[0];
            this.selectedItems = [
              ...this.selectedItems,
              {
                id: found.id,
                itemName: found.itemName,
              },
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
      .pipe(select(fromCategoryType.selectAllCategoryTypes))
      .subscribe((val: CategoryType[]) => {
        if (val.length > 0) {
          val.map((x) => {
            this.itemList.push({
              id: x._id,
              itemName: x.name,
              category: x.category.name,
            });
          });
        }
      });
  }

  applySettings() {
    this.settings = {
      singleSelection: false,
      text: this.text,
      searchPlaceholderText: this.placeholderText,
      enableSearchFilter: true,
      limitSelection: 5,
      badgeShowLimit: 5,
      groupBy: "category",
    };
  }

  onItemSelect(item: any) {
    this.setSelectedCategory();

    this.store.dispatch(
      new CategoryTypeActions.SetSelectedCategoryType({
        selectedCategoryType: this.selectCategoryIds,
      })
    );
  }

  setPreselectedCategories() {
    this.store
      .pipe(select(fromCategoryType.selectSelectedCategoryTypes))
      .subscribe((val: string[]) => {
        if (val) {
          for (let id of val) {
            const found = this.itemList.filter((x) => x.id === id)[0];
            if (found) {
              this.selectedItems.push({
                id: found.id,
                itemName: found.itemName,
                category: found.category,
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
    this.setSelectedCategory();
    this.store.dispatch(
      new CategoryTypeActions.SetSelectedCategoryType({
        selectedCategoryType: this.selectCategoryIds,
      })
    );
  }
  onSelectAll(items: any) {}
  onDeSelectAll(items: any) {}
}
