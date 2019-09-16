import { NgModule } from '@angular/core';
import { ContestsComponent } from './contests.component';
import { SharedModule } from '../shared/shared.module';
import { ContestDetailsComponent } from './contest-details/contest-details.component';
import { ContestsRoutingModule } from './contests-routing.module';
import { ContestEntryComponent } from './contest-entry/contest-entry.component';
import { ContestComponent } from './contest/contest.component';
import { ContestDetailsModalComponent } from './contest-details-modal/contest-details-modal.component';

@NgModule({
  declarations: [
    ContestsComponent,
    ContestDetailsComponent,
    ContestEntryComponent,
    ContestComponent,
    ContestDetailsModalComponent
  ],
  imports: [SharedModule, ContestsRoutingModule],
  exports: [ContestsRoutingModule]
})
export class ContestsModule {}
