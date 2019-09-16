import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', loadChildren: './account/auth.module#AuthModule' },
  {
    path: 'talents',
    loadChildren: './talents/talents.module#TalentsModule'
  },
  {
    path: 'contests',
    loadChildren: './contests/contests.module#ContestsModule'
  },
  {
    path: 'user',
    loadChildren: './user-contest/user-contest.module#UserContestModule'
  },
  {
    path: 'professionals',
    loadChildren: './professionals/professionals.module#ProfessionalsModule'
  },

  {
    path: '',
    loadChildren: './user/user.module#UserModule'
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
