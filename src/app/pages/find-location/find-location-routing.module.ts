
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindLocationPage } from './find-location.page';

const routes: Routes = [
  {
    path: '',
    component: FindLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindLocationPageRoutingModule { }
