import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { AuthGuard } from "./guard-services/auth-guard.service";
import { CompleteProfile } from "./guard-services/complete-profile.guard.service";
import { CompleteProfileComponent } from "./user/complete-profile/complete-profile.component";
import { NotLoggedInComponent } from "./not-logged-in/not-logged-in.component";
import { AboutUsComponent } from "./shared/about-us/about-us.component";
import { TermsConditionComponent } from "./shared/terms-condition/terms-condition.component";
import { CompetitionTermsComponent } from "./shared/competition-terms/competition-terms.component";
import { PrivacyPolicyComponent } from "./shared/privacy-policy/privacy-policy.component";

const appRoutes: Routes = [
  { path: "", canActivate: [CompleteProfile], component: HomeComponent },
  {
    path: "account",
    loadChildren: () =>
      import("./account/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "talents",
    loadChildren: () =>
      import("./talents/talents.module").then((m) => m.TalentsModule),
  },
  {
    path: "competitions",
    loadChildren: () =>
      import("./contests/contests.module").then((m) => m.ContestsModule),
  },
  {
    path: "user/competition",
    canActivate: [AuthGuard, CompleteProfile],
    loadChildren: () =>
      import("./user-contest/user-contest.module").then(
        (m) => m.UserContestModule
      ),
  },
  {
    path: "professionals",
    loadChildren: () =>
      import("./professionals/professionals.module").then(
        (m) => m.ProfessionalsModule
      ),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./back-office/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "about-us",
    component: AboutUsComponent,
  },
  {
    path: "terms-condition",
    component: TermsConditionComponent,
  },
  {
    path: "competition-terms-condition",
    component: CompetitionTermsComponent,
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
  },

  // {
  //   path: 'app',
  //   component: MainAppComponent,
  //   children: [
  //     { path: 'auth', loadChildren: './account/auth.module#AuthModule' },
  //     {
  //       path: 'talents',
  //       loadChildren: './talents/talents.module#TalentsModule'
  //     },
  //     {
  //       path: 'user-contest',
  //       loadChildren: './user-contest/user-contest.module#UserContestModule'
  //     },
  //     {
  //       path: '',
  //       loadChildren: './user/user.module#UserModule'
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
