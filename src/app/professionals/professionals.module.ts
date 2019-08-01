import { NgModule } from '@angular/core';
import { ProfessionalsComponent } from './professionals.component';
import { ProfessionalsRoutingModule } from './professionals-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfessionalListComponent } from './professional-list/professional-list.component';
import { ProfessionalItemComponent } from './professional-list/professional-item/professional-item.component';

@NgModule({
  declarations: [
    ProfessionalsComponent,
    ProfessionalListComponent,
    ProfessionalItemComponent
  ],
  imports: [SharedModule, ProfessionalsRoutingModule],
  exports: [ProfessionalsRoutingModule]
})
export class ProfessionalsModule {}
