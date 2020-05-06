import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import { IAuthData, UserFilterCategory } from "../interfaces";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import * as fromProfessionals from "../shared/store/filtered-categories/professional-category/professional-category.reducer";

@Component({
  selector: "app-professionals",
  templateUrl: "./professionals.component.html",
  styleUrls: ["./professionals.component.css"],
})
export class ProfessionalsComponent implements OnInit {
  professionals: Observable<UserFilterCategory[]>;
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
  currentUser: Observable<IAuthData>;
  searchPlaceHolderText = "Professionals";

  ngOnInit() {
    this.currentUser = this.store.pipe(select(fromAuth.selectCurrentUserData));

    this.professionals = this.store.pipe(
      select(fromProfessionals.selectProfessionals)
    );
  }

  onSignUpClicked() {
    this.router.navigate(["/account/signin"]);
  }
}
