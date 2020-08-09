import { NgModule } from "@angular/core";
import { ContestsComponent } from "./contests.component";
import { SharedModule } from "../shared/shared.module";
import { ContestDetailsComponent } from "./contest-details/contest-details.component";
import { ContestsRoutingModule } from "./contests-routing.module";
import { ContestEntryComponent } from "./contest-entry/contest-entry.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EntryCommentComponent } from "./contest-details/entry-comment/entry-comment.component";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { ContestantModalComponent } from "./contestant-modal/contestant-modal.component";
import { ContestAnalysisReportComponent } from "./contest-analysis-report/contest-analysis-report.component";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    ContestsComponent,
    ContestDetailsComponent,
    ContestEntryComponent,
    EntryCommentComponent,
    ContestantModalComponent,
    ContestAnalysisReportComponent,
  ],
  imports: [
    SharedModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    ContestsRoutingModule,
  ],
  exports: [ContestsRoutingModule],
})
export class ContestsModule {}
