import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
    { path: '',  component: HomeComponent },
    { path: 'auth', loadChildren: './account/auth.module#AuthModule' },
    { path: 'account/:username', loadChildren: './talent/talent.module#TalentModule' },
    // { path: 'talents', loadChildren: './talents/talents.module#TalentsModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
