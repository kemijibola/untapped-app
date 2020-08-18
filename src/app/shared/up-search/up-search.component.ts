import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as UserFilterActions from "../store/filtered-categories/user-filter/user-filter.action";
import * as fromCategory from "../store/category/category.reducers";
import { Category } from "src/app/interfaces";

@Component({
  selector: "app-up-search",
  templateUrl: "./up-search.component.html",
  styleUrls: ["./up-search.component.css"],
})
export class UpSearchComponent implements OnInit, OnChanges {
  @Input() placeholderText: string;
  placeholder = "";
  searchForm: FormGroup;
  @Input() userTypeId: string;
  categoryId: string = "";
  searchText: string = "";
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(""),
    });

    this.store
      .pipe(select(fromCategory.selectCurrentCategory))
      .subscribe((val: Category) => {
        if (val) {
          this.categoryId = val._id;
        }
      });

    this.searchInput.valueChanges
      .pipe(
        // filter((res) => res.length > 2),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((data: string) => {
        if (data.length > 2) {
          this.store.dispatch(
            new UserFilterActions.FetchAllUsers({
              queryParams: {
                searchText: data,
                categoryId: this.categoryId,
                userTypeId: this.userTypeId,
              },
            })
          );
          this.searchText = data;
          this.store.dispatch(
            new UserFilterActions.SetFilterText({ searchText: data })
          );
        } else {
          this.store.dispatch(
            new UserFilterActions.FetchAllUsers({
              queryParams: {
                userTypeId: this.userTypeId,
                categoryId: this.categoryId,
              },
            })
          );
        }
      });
  }

  get searchInput(): AbstractControl {
    return this.searchForm.get("searchInput");
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges["placeholderText"]) {
      this.placeholder = this.placeholderText;
    }
  }
}
