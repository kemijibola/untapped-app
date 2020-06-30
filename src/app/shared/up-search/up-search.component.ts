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
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as UserFilterActions from "../store/filtered-categories/user-filter/user-filter.action";

@Component({
  selector: "app-up-search",
  templateUrl: "./up-search.component.html",
  styleUrls: ["./up-search.component.css"],
})
export class UpSearchComponent implements OnInit, OnChanges {
  @Input() placeholderText: string;
  placeholder = "";
  searchForm: FormGroup;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl("", Validators.required),
    });

    this.searchInput.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((data: string) => {
        console.log(`debounced text input value ${data}`);
        this.store.dispatch(
          new UserFilterActions.SetFilterText({ searchText: data })
        );
      });
  }

  get searchInput(): AbstractControl {
    return this.searchForm.get("searchInput");
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges["placeholderText"]) {
      this.placeholder = this.placeholderText;
      console.log(this.placeholder);
    }
  }
}
