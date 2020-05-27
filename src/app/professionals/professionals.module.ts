import { NgModule } from "@angular/core";
import { ProfessionalsComponent } from "./professionals.component";
import { ProfessionalsRoutingModule } from "./professionals-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ProfessionalListComponent } from "./professional-list/professional-list.component";
import { ProfessionalItemComponent } from "./professional-list/professional-item/professional-item.component";
import { ProfessionalBiodataComponent } from "./professional-biodata/professional-biodata.component";
import { LazyLoadImageModule } from "ng-lazyload-image";

@NgModule({
  declarations: [
    ProfessionalsComponent,
    ProfessionalListComponent,
    ProfessionalItemComponent,
    ProfessionalBiodataComponent,
  ],
  imports: [SharedModule, LazyLoadImageModule, ProfessionalsRoutingModule],
  exports: [ProfessionalsRoutingModule],
})
export class ProfessionalsModule {}
