
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddresssPageRoutingModule } from './addresss-routing.module';

import { AddresssPage } from './addresss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddresssPageRoutingModule
  ],
  declarations: [AddresssPage]
})
export class AddresssPageModule { }
