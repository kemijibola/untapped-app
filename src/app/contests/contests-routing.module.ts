import { ContestAnalysisReportComponent } from "./contest-analysis-report/contest-analysis-report.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ContestsComponent } from "./contests.component";
import { ContestDetailsComponent } from "./contest-details/contest-details.component";

const contestsRouting: Routes = [
  { path: "", component: ContestsComponent },
  { path: ":id", component: ContestDetailsComponent },
  { path: ":id/result", component: ContestAnalysisReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(contestsRouting)],
  exports: [RouterModule],
})
export class ContestsRoutingModule {}
