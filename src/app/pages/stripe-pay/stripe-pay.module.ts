
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StripePayPageRoutingModule } from './stripe-pay-routing.module';

import { StripePayPage } from './stripe-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StripePayPageRoutingModule
  ],
  declarations: [StripePayPage]
})
export class StripePayPageModule { }
