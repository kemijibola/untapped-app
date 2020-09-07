import { Component, OnInit } from "@angular/core";
import * as UserTypeActions from "../store/user-type.actions";
import * as fromApp from "../../store/app.reducers";
import { Store } from "@ngrx/store";
@Component({
  selector: "app-user-type-list",
  templateUrl: "./user-type-list.component.html",
  styleUrls: ["./user-type-list.component.css"],
})
export class UserTypeListComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new UserTypeActions.FetchUserTypes());
  }

  ngOnInit() {}
}
