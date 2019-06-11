import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { sharedReducers } from './shared.reducers';
import { UploadComponent } from './upload/upload.component';
import { DialogComponent } from './upload/dialog/dialog.component';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('shared', sharedReducers)
    ],
    exports: [
        UploadComponent
    ],
    declarations: [
        UploadComponent,
        DialogComponent
    ]
})

export class SharedModule {}
