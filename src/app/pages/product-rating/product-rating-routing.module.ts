
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductRatingPage } from './product-rating.page';

const routes: Routes = [
  {
    path: '',
    component: ProductRatingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRatingPageRoutingModule { }
