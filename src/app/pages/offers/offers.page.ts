
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import * as moment from 'moment';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  dummy = Array(5);
  list: any[] = [];
  dummyList: any[] = [];
  page = 1;
  constructor(
    public api: ApiService,
    public util: UtilService,
    public cart: CartService
  ) {
    this.getOffers();
  }

  ngOnInit() {
  }

  getOffers() {
    this.api.get_public('v1/offers/getMyOffers').then((data: any) => {
      console.log(data);
      this.dummy = [];
      if (data && data.status == 200 && data.data && data.data.length) {
        console.log(data.data)
        const info = data.data;
        this.list = info;
        this.dummyList = info;
      }
    }, error => {
      console.log(error);
      this.dummy = [];
      this.util.apiErrorHandler(error);
    }).catch(error => {
      console.log(error);
      this.dummy = [];
      this.util.apiErrorHandler(error);
    });
  }


  selected(item: any) {
    console.log(item);
    const min = parseFloat(item.min);
    if (this.cart.totalPrice >= min) {
      this.cart.coupon = item;
      this.cart.calcuate();
      this.util.onBack();
    } else {
      console.log('not valid with minimum amout', min);
      this.util.showToast(this.util.translate('Sorry') + '\n' + this.util.translate('minimum cart value must be') + ' ' + min +
        ' ' + this.util.translate('or equal'), 'danger', 'bottom');
    }

  }

  getTime(time: any) {
    return moment(time).format('DD MMM');
  }
  convertStringToInt(discount:any){
    return parseInt(discount);
  }
  loggedIn() {
    const uid = localStorage.getItem('uid');
    if (uid && uid != null && uid != 'null') {
      return true;
    }
    return false;
  }
  getName() {
    return this.util.userInfo && this.util.userInfo.first_name ? this.util.userInfo.first_name + ' ' + this.util.userInfo.last_name : 'Groceryee';
  }

  getEmail() {
    return this.util.userInfo && this.util.userInfo.email ? this.util.userInfo.email : 'info@groceryee.com';
  }

  getProfile() {
    return this.util.userInfo && this.util.userInfo.cover ? this.api.mediaURL + this.util.userInfo.cover : 'assets/imgs/user.png';
  }
  logout() {
    this.util.show();
    this.api.post_private('v1/auth/logout', {}).then((data: any) => {
      this.util.hide();
      console.log(data)
      localStorage.removeItem('uid');
      localStorage.removeItem('token');
      this.cart.cart = [];
      this.cart.itemId = [];
      this.cart.totalPrice = 0;
      this.cart.grandTotal = 0;
      this.cart.coupon = null;
      this.cart.discount = null;
      this.util.navigateRoot('/tabs/home');
    }, error => {
      this.util.hide();
      console.log(error);
      this.util.apiErrorHandler(error);
    }).catch(error => {
      this.util.hide();
      console.log(error);
      this.util.apiErrorHandler(error);
    });

  }
}
