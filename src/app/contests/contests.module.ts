import { NgModule } from '@angular/core';
import { ContestsComponent } from './contests.component';
import { SharedModule } from '../shared/shared.module';
import { ContestDetailsComponent } from './contest-details/contest-details.component';
import { ContestsRoutingModule } from './contests-routing.module';

@NgModule({
  declarations: [ContestsComponent, ContestDetailsComponent],
  imports: [SharedModule, ContestsRoutingModule],
  exports: [ContestsRoutingModule]
})
export class ContestsModule {}
