
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindLocationPageRoutingModule } from './find-location-routing.module';

import { FindLocationPage } from './find-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindLocationPageRoutingModule
  ],
  declarations: [FindLocationPage]
})
export class FindLocationPageModule { }
