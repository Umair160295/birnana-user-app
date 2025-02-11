
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
    public util: UtilService
  ) { }

  ngOnInit() { }

  selected(value: any) {
    this.popoverController.dismiss(value, 'selected');
  }
}
