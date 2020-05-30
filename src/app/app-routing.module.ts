import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { AuthGuard } from "./guard-services/auth-guard.service";
import { CompleteProfile } from "./guard-services/complete-profile.guard.service";
import { CompleteProfileComponent } from "./user/complete-profile/complete-profile.component";
import { NotLoggedInComponent } from "./not-logged-in/not-logged-in.component";

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
    path: "contests",
    loadChildren: () =>
      import("./contests/contests.module").then((m) => m.ContestsModule),
  },
  {
    path: "user/contest",
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
    path: "",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
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
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
