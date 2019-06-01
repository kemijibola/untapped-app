import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { sharedReducers } from './shared.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('shared', sharedReducers)
    ]
})

export class SharedModule {}
