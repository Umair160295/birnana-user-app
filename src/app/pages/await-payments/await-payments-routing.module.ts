
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AwaitPaymentsPage } from './await-payments.page';

const routes: Routes = [
  {
    path: '',
    component: AwaitPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AwaitPaymentsPageRoutingModule { }
