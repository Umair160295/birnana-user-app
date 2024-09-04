
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddresssPage } from './addresss.page';

const routes: Routes = [
  {
    path: '',
    component: AddresssPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddresssPageRoutingModule { }
