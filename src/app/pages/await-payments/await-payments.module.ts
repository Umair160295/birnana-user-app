
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AwaitPaymentsPageRoutingModule } from './await-payments-routing.module';

import { AwaitPaymentsPage } from './await-payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AwaitPaymentsPageRoutingModule
  ],
  declarations: [AwaitPaymentsPage]
})
export class AwaitPaymentsPageModule { }
