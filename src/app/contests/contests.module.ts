import { NgModule } from "@angular/core";
import { ContestsComponent } from "./contests.component";
import { SharedModule } from "../shared/shared.module";
import { ContestDetailsComponent } from "./contest-details/contest-details.component";
import { ContestsRoutingModule } from "./contests-routing.module";
import { ContestEntryComponent } from "./contest-entry/contest-entry.component";
import { ContestDetailsModalComponent } from "./contest-details-modal/contest-details-modal.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    ContestsComponent,
    ContestDetailsComponent,
    ContestEntryComponent,
    ContestDetailsModalComponent,
  ],
  imports: [SharedModule, InfiniteScrollModule, ContestsRoutingModule],
  exports: [ContestsRoutingModule],
})
export class ContestsModule {}
