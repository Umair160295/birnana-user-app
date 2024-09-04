
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { TimeComponent } from './time/time.component';
import { PopoverComponent } from './popover/popover.component';
import { FiltersComponent } from './filters/filters.component';
import { ClosedComponent } from './closed/closed.component';
import { MapComponent } from './map/map.component';

const components = [
  TimeComponent,
  PopoverComponent,
  FiltersComponent,
  ClosedComponent,
  MapComponent
];
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [
    ...components,
  ]
})
export class ComponentsModule { }
