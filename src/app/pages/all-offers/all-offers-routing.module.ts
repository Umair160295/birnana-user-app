
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllOffersPage } from './all-offers.page';

const routes: Routes = [
  {
    path: '',
    component: AllOffersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllOffersPageRoutingModule { }
