import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-terms-condition",
  templateUrl: "./terms-condition.component.html",
  styleUrls: ["./terms-condition.component.css"],
})
export class TermsConditionComponent implements OnInit {
  termsLastUpdateDate = environment.TERMS_CONDITION_LAST_DATE;
  constructor() {}

  ngOnInit(): void {}
}
