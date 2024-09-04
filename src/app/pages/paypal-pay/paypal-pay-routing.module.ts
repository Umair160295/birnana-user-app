
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaypalPayPage } from './paypal-pay.page';

const routes: Routes = [
  {
    path: '',
    component: PaypalPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaypalPayPageRoutingModule { }
