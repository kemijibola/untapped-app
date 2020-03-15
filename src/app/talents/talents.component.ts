import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import { selectUserData } from "../account/store/auth.selectors";
import { IAuthData } from "../interfaces";
import { Router } from "@angular/router";

@Component({
  selector: "app-talents",
  templateUrl: "./talents.component.html",
  styleUrls: ["./talents.component.css"]
})
export class TalentsComponent implements OnInit {
  isAuthenticated: boolean;
  searchPlaceHolderText = "Talents";
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit() {
    this.store.pipe(select(selectUserData)).subscribe((val: IAuthData) => {
      this.isAuthenticated = val.authenticated;
    });
  }

  onSignUpClicked() {
    this.router.navigate(["/account/signin"]);
  }
}
