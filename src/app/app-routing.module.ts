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
    loadChildren: "./account/auth.module#AuthModule"
  },
  {
    path: "talents",
    loadChildren: "./talents/talents.module#TalentsModule"
  },
  {
    path: "contests",
    canActivate: [AuthGuard, CompleteProfile],
    loadChildren: "./contests/contests.module#ContestsModule"
  },
  {
    path: "user",
    canActivate: [AuthGuard, CompleteProfile],
    loadChildren: "./user-contest/user-contest.module#UserContestModule"
  },
  {
    path: "professionals",
    loadChildren: "./professionals/professionals.module#ProfessionalsModule"
  },

  {
    path: "",
    loadChildren: "./user/user.module#UserModule"
  }

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
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
