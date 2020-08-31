import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-competition-terms",
  templateUrl: "./competition-terms.component.html",
  styleUrls: ["./competition-terms.component.css"],
})
export class CompetitionTermsComponent implements OnInit {
  termsLastUpdateDate = environment.COMPETITION_TERMS_LAST_DATE;
  constructor() {}

  ngOnInit(): void {}
}
