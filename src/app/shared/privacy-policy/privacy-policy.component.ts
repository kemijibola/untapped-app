import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.css"],
})
export class PrivacyPolicyComponent implements OnInit {
  privacyPolicyUpdateDate = environment.COMPETITION_TERMS_LAST_DATE;
  constructor() {}

  ngOnInit(): void {}
}
