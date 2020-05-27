import { NgModule } from "@angular/core";
import { ContestsComponent } from "./contests.component";
import { SharedModule } from "../shared/shared.module";
import { ContestDetailsComponent } from "./contest-details/contest-details.component";
import { ContestsRoutingModule } from "./contests-routing.module";
import { ContestEntryComponent } from "./contest-entry/contest-entry.component";
import { ContestDetailsModalComponent } from "./contest-details-modal/contest-details-modal.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EntryListComponent } from "./contest-details/entry-list/entry-list.component";
import { ContestEntryModalContentComponent } from "./contest-details/contest-entry-modal-content/contest-entry-modal-content.component";
import { EntryCommentComponent } from "./contest-details/entry-comment/entry-comment.component";
import { LazyLoadImageModule } from "ng-lazyload-image";

@NgModule({
  declarations: [
    ContestsComponent,
    ContestDetailsComponent,
    ContestEntryComponent,
    ContestDetailsModalComponent,
    EntryListComponent,
    ContestEntryModalContentComponent,
    EntryCommentComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    ContestsRoutingModule,
  ],
  exports: [ContestsRoutingModule],
})
export class ContestsModule {}
