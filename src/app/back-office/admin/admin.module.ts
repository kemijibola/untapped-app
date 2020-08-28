import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { pendingMediaReducer } from "../store/approvals/media/media.reducer";
import { PendingMediaEffect } from "../store/approvals/media/media.effects";
import { EffectsModule } from "@ngrx/effects";
import { AdminApprovalService } from "src/app/services/back-office/approvals/admin-approvals.service";
import { MediaApprovalsComponent } from "./media-approvals/media-approvals.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ContestApprovalsComponent } from "./contest-approvals/contest-approvals.component";
import { ContestSubmissionsComponent } from "./contest-submissions/contest-submissions.component";
import { pendingContestReducer } from "../store/approvals/contest/contest.reducer";
import { PendingContestEffect } from "../store/approvals/contest/contest.effects";
import { pendingEntryReducer } from "../store/approvals/entry/entry.reducer";
import { PendingEntryEffect } from "../store/approvals/entry/entry.effects";
import { ProfileApprovalComponent } from "./profile-approval/profile-approval.component";
import { pendingUserReducer } from "../store/approvals/profile/profile.reducer";
import { PendingUserEffect } from "../store/approvals/profile/profile.effect";

@NgModule({
  declarations: [
    AdminComponent,
    MediaApprovalsComponent,
    ContestApprovalsComponent,
    ContestSubmissionsComponent,
    ProfileApprovalComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    StoreModule.forFeature("pendingMediaState", pendingMediaReducer),
    StoreModule.forFeature("pendingContestState", pendingContestReducer),
    StoreModule.forFeature("pendingEntryState", pendingEntryReducer),
    StoreModule.forFeature("pendingUserState", pendingUserReducer),
    EffectsModule.forFeature([
      PendingMediaEffect,
      PendingContestEffect,
      PendingEntryEffect,
      PendingUserEffect,
    ]),
  ],
  providers: [AdminApprovalService],
  exports: [AdminRoutingModule],
})
export class AdminModule {}
