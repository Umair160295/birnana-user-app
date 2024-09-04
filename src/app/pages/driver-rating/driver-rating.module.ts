
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverRatingPageRoutingModule } from './driver-rating-routing.module';

import { DriverRatingPage } from './driver-rating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverRatingPageRoutingModule
  ],
  declarations: [DriverRatingPage]
})
export class DriverRatingPageModule { }
