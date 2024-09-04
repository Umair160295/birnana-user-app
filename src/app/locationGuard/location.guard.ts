
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Injectable({
  providedIn: 'root'
})
export class LocationGuard implements CanActivate {

  constructor(public util: UtilService) { }

  canActivate(route: ActivatedRouteSnapshot): any {
    const location = localStorage.getItem('location');
    console.log('location', localStorage.getItem('location'));
    if (location && location != null && location != 'null') {
      return true;
    }
    this.util.navigateRoot('/find-location');
    return false;
  }
}
