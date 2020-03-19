import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UploadComponent } from "./upload/upload.component";
import { UserProfilePictureComponent } from "./user-profile-picture/user-profile-picture.component";
import { TabsComponent } from "./tabs/tabs.component";
import { RouterModule } from "@angular/router";
import { ModalsComponent } from "./modals/modals.component";
import { SlideToggleComponent } from "./slide-toggle/slide-toggle.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { TalentCategoriesComponent } from "./talent-categories/talent-categories.component";
import { MaterialModule } from "../material.module";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { ModalComponent } from "./modal/modal.component";
import { UpSearchComponent } from "./up-search/up-search.component";
import { UpCategerySearchComponent } from "./up-categery-search/up-categery-search.component";
import { UpUserFilterContainerComponent } from "./up-user-filter-container/up-user-filter-container.component";
import { UpUserFilterComponent } from "./up-user-filter/up-user-filter.component";
import { UpUserFilterItemComponent } from "./up-user-filter/up-user-filter-item/up-user-filter-item.component";
import { TruncateTextPipe } from "./utils/pipes/truncate-text.pipe";
// Simport { AudioPayerComponent } from './audio-payer/audio-payer.component';

@NgModule({
  imports: [
    FormsModule,
    MatSlideToggleModule,
    AngularMultiSelectModule,
    CommonModule,
    MaterialModule,
    RouterModule.forChild([])
  ],
  exports: [
    CommonModule,
    UploadComponent,
    UserProfilePictureComponent,
    TabsComponent,
    ModalsComponent,
    ModalComponent,
    SlideToggleComponent,
    TalentCategoriesComponent,
    UpSearchComponent,
    UpCategerySearchComponent,
    UpUserFilterContainerComponent,
    UpUserFilterComponent,
    UpUserFilterItemComponent,
    TruncateTextPipe
  ],
  declarations: [
    UploadComponent,
    UserProfilePictureComponent,
    TabsComponent,
    ModalsComponent,
    SlideToggleComponent,
    TalentCategoriesComponent,
    ModalComponent,
    UpSearchComponent,
    UpCategerySearchComponent,
    UpUserFilterContainerComponent,
    UpUserFilterComponent,
    UpUserFilterItemComponent,
    TruncateTextPipe
  ]
})
export class SharedModule {}
