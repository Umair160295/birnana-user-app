
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreRatingPageRoutingModule } from './store-rating-routing.module';

import { StoreRatingPage } from './store-rating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreRatingPageRoutingModule
  ],
  declarations: [StoreRatingPage]
})
export class StoreRatingPageModule { }
