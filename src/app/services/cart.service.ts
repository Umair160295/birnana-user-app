
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from './api.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: any[] = [];
  public itemId: any[] = [];
  public totalPrice: any = 0;
  public grandTotal: any = 0;
  public coupon: any;
  public discount: any = 0;
  public walletDiscount: any = 0;
  public orderTax: any = 0;
  public orderPrice: any;
  public shipping: any;
  public shippingPrice: any = 0;
  public minOrderPrice: any = 0;
  public freeShipping: any = 0;
  public datetime: any;
  public deliveryAt: any;
  public deliveryAddress: any;
  public deliveryPrice: any = 0;
  public stores: any[] = [];

  public bulkOrder: any[] = [];

  public userOrderTaxByStores: any[] = [];
  constructor(
    public api: ApiService,
    public util: UtilService,
    private alertCtrl: AlertController
  ) {
    this.util.getKeys('cart').then((data: any) => {
      if (data && data != null && data != 'null') {
        const userCart = JSON.parse(data);
        if (userCart && userCart.length > 0) {
          this.cart = userCart;
          this.itemId = [...new Set(this.cart.map(item => item.id))];
          this.calcuate();
        } else {
          this.calcuate();
        }
      } else {
        this.calcuate();
      }
    });
  }

  clearCartAlert(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
        header: this.util.translate('Warning'),
        message: this.util.translate("You already have item's in cart with different grocery store"),
        buttons: [
          {
            text: this.util.translate('Cancel'),
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          }, {
            text: this.util.translate('Clear Cart'),
            handler: () => {
              this.clearCart();
              resolve(true);
            }
          }
        ]
      });

      await alert.present();
    });

  }

  clearCart() {
    this.cart = [];
    this.itemId = [];
    this.totalPrice = 0;
    this.grandTotal = 0;
    this.coupon = undefined;
    this.discount = 0;
    this.walletDiscount = 0;
    this.orderPrice = 0;
    this.datetime = undefined;
    this.stores = [];
    this.util.clearKeys('cart');
  }

  addItem(item: any) {
    this.cart.push(item);
    this.itemId.push(item.id);
    this.calcuate();
  }

  addQuantity(quantity: any, id: any) {
    if (quantity < 0) {
      this.removeItem(id);
      return false;
    }
    this.cart.forEach(element => {
      if (element.id == id) {
        element.quantiy = quantity;
      }
    });
    this.calcuate();
  }

  removeItem(id: any) {
    this.cart = this.cart.filter(x => x.id != id);
    this.itemId = this.itemId.filter(x => x != id);
    this.calcuate();
  }

  calcuate() {
    this.userOrderTaxByStores = [];
    let total = 0;
    this.cart.forEach(element => {
      if (element && element.discount == 0) {
        if (element.size == '1' || element.size == 1) {
          if (element.variations[0].items[element.variant].discount && element.variations[0].items[element.variant].discount != 0) {
            total = total + (parseFloat(element.variations[0].items[element.variant].discount) * element.quantiy);
          } else {
            total = total + (parseFloat(element.variations[0].items[element.variant].price) * element.quantiy);
          }
        } else {
          total = total + (parseFloat(element.original_price) * element.quantiy);
        }
      } else {
        if (element.size == '1' || element.size == 1) {
          if (element.variations[0].items[element.variant].discount && element.variations[0].items[element.variant].discount != 0) {
            total = total + (parseFloat(element.variations[0].items[element.variant].discount) * element.quantiy);
          } else {
            total = total + (parseFloat(element.variations[0].items[element.variant].price) * element.quantiy);
          }
        } else {
          total = total + (parseFloat(element.sell_price) * element.quantiy);
        }
      }
    });
    this.totalPrice = total;

    if (this.coupon && this.coupon.type) {
      const min = parseFloat(this.coupon.min);
      if (this.totalPrice >= min) {
        if (this.coupon && this.coupon.type == 'per') {
          function percentage(num: any, per: any) {
            return (num / 100) * per;
          }
          const totalPrice = percentage(parseFloat(this.totalPrice).toFixed(2), parseFloat(this.coupon.off));
          this.discount = totalPrice.toFixed(2);
          // this.grandTotal = (this.totalPrice - parseFloat(this.discount)) + this.orderTax;
        } else {
          this.discount = this.coupon.off;
          // this.grandTotal = (this.totalPrice - parseFloat(this.discount)) + this.orderTax;
        }
      } else {
        this.discount = 0;
        this.coupon = null;
      }
    } else {
      this.grandTotal = this.totalPrice + this.orderTax;
      if (this.grandTotal <= this.walletDiscount) {
        this.walletDiscount = this.grandTotal;
        this.grandTotal = this.grandTotal - this.walletDiscount;
      } else {
        this.grandTotal = this.grandTotal - this.walletDiscount;
      }

      this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
    }
    if (this.stores && this.stores.length && this.deliveryAddress && this.deliveryAt == 'home') {
      // this.deliveryPrice = 0;
      let totalKM = 0;
      let taxEach = 0;
      this.stores.forEach(async (element) => {
        const distance = await this.distanceInKmBetweenEarthCoordinates(this.deliveryAddress.lat, this.deliveryAddress.lng,
          element.lat, element.lng);
        totalKM = totalKM + distance;
        // const storeCount = this.stores.length + 1;
        taxEach = this.orderTax / this.stores.length;
        const extraChargeParam = {
          store_id: element.uid,
          distance: distance.toFixed(2),
          tax: taxEach.toFixed(2),
          shipping: this.shipping,
          shippingPrice: this.shippingPrice
        };
        this.userOrderTaxByStores.push(extraChargeParam);
      });
      setTimeout(() => {
        if (this.freeShipping > this.totalPrice) {
          if (this.shipping == 'km') {
            const distancePricer = totalKM * this.shippingPrice;
            this.deliveryPrice = Math.floor(distancePricer).toFixed(2);
            if (!this.discount || this.discount == null) {
              this.discount = 0;
            }
            this.grandTotal = (this.totalPrice - parseFloat(this.discount)) + this.orderTax + distancePricer;
            this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
            if (this.grandTotal <= this.walletDiscount) {
              this.walletDiscount = this.grandTotal;
              this.grandTotal = this.grandTotal - this.walletDiscount;
            } else {
              this.grandTotal = this.grandTotal - this.walletDiscount;
            }
            this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
          } else {
            this.deliveryPrice = this.shippingPrice;
            if (!this.discount || this.discount == null) {
              this.discount = 0;
            }
            this.grandTotal = (this.totalPrice - parseFloat(this.discount)) + this.orderTax + this.shippingPrice;
            this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
            if (this.grandTotal <= this.walletDiscount) {
              this.walletDiscount = this.grandTotal;
              this.grandTotal = this.grandTotal - this.walletDiscount;
            } else {
              this.grandTotal = this.grandTotal - this.walletDiscount;
            }
            this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
          }

        } else {
          this.deliveryPrice = 0;
          if (!this.discount || this.discount == null) {
            this.discount = 0;
          }
          this.grandTotal = (this.totalPrice - parseFloat(this.discount)) + this.orderTax;
          this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
          if (this.grandTotal <= this.walletDiscount) {
            this.walletDiscount = this.grandTotal;
            this.grandTotal = this.grandTotal - this.walletDiscount;
          } else {
            this.grandTotal = this.grandTotal - this.walletDiscount;
          }
          this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
        }
      }, 1000);

    } else {
      let taxEach = 0;
      this.stores.forEach(async (element) => {
        taxEach = this.orderTax / this.stores.length;
        const extraChargeParam = {
          store_id: element.uid,
          distance: 0,
          tax: taxEach.toFixed(2),
          shipping: this.shipping,
          shippingPrice: this.shippingPrice
        };
        this.userOrderTaxByStores.push(extraChargeParam);
      });
      this.deliveryPrice = 0;
      this.discount = this.discount == null || this.discount == 0 || !this.discount ? 0 : this.discount;
      this.grandTotal = (this.totalPrice - parseFloat(this.discount)) + parseFloat(this.orderTax);
      this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
      if (this.grandTotal <= this.walletDiscount) {
        this.walletDiscount = this.grandTotal;
        this.grandTotal = this.grandTotal - this.walletDiscount;
      } else {
        this.grandTotal = this.grandTotal - this.walletDiscount;
      }
      this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
    }
    this.util.clearKeys('cart');
    this.util.setKeys('cart', JSON.stringify(this.cart));
  }

  createBulkOrder() {
    const order: any[] = [];
    const ids = [...new Set(this.cart.map(item => item.store_id))];
    ids.forEach(element => {
      const param = {
        id: element,
        order: []
      };
      order.push(param);
    });

    ids.forEach((element, index) => {
      this.cart.forEach(cart => {
        if (cart.store_id == element) {
          order[index].order.push(cart);
        }
      })
    });
    this.bulkOrder = order;
  }
  checkProductInCart(id: any) {
    return this.itemId.includes(id);
  }

  degreesToRadians(degrees: any) {
    return degrees * Math.PI / 180;
  }

  distanceInKmBetweenEarthCoordinates(lat1: any, lon1: any, lat2: any, lon2: any) {
    const earthRadiusKm = 6371;

    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }
}
