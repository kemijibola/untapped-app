import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalentComponent } from './talent.component';
import { ProfileComponent } from './profile/profile.component';


const talentRouting: Routes = [
    { path: '', component: TalentComponent }
];

@NgModule({
    imports: [RouterModule.forChild(talentRouting)],
    exports: [RouterModule]
})

export class TalentRoutingModule {}