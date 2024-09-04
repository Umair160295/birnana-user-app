
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
declare var google: any;
import { ModalController } from '@ionic/angular';
import { MapComponent } from 'src/app/components/map/map.component';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  lat: any;
  lng: any;
  address: any = '';
  house: any = '';
  landmark: any = '';
  title: any = 'home';
  pincode: any = '';
  id: any;
  from: any;
  name:any;
  mobile:any;
  email:any;
  city:any;
  constructor(
    public util: UtilService,
    public api: ApiService,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {

    this.route.queryParams.subscribe((data: any) => {
      if (data && data.from) {
        this.from = 'edit';
        const info = JSON.parse(data.data);
        this.name = info.customer_name;
        this.mobile = info.customer_phone;
        this.email = info.customer_email;
        this.address = info.address;
        this.city = info.city;
        this.house = info.house;
        this.id = info.id;
        this.landmark = info.landmark;
        this.lat = info.lat;
        this.lng = info.lng;
        this.pincode = info.pincode;
      } else {
        this.from = 'new';
        this.getProfile();
      }
    });
  }

  ngOnInit() {
   
  }
  getProfile() {
    const param = {
      id: localStorage.getItem('uid')
    };
    this.util.show();
    this.api.post_private('v1/profile/byId', param).then((data: any) => {
      this.util.hide();
      console.log('user info=>', data);
      if (data && data.status == 200 && data.data && data.data) {
        const info = data.data;
        this.util.userInfo = info;
        this.name = info.first_name + ' ' + info.last_name;
        this.mobile = info.mobile;
        this.email = info.email;
      }
    }, error => {
      console.log(error);
      this.util.hide();
      this.util.apiErrorHandler(error);
    }).catch(error => {
      console.log(error);
      this.util.hide();
      this.util.apiErrorHandler(error);
    });
  }
  addAddress() {
    if (this.address == '' || this.pincode == '' || this.name == '' || this.email == '' || this.mobile == '') {
      this.util.errorToast(this.util.translate('All Fields are required'));
      return false;
    }
    // if (typeof google == 'object' && typeof google.maps == 'object') {
    //   const geocoder = new google.maps.Geocoder;
    //   geocoder.geocode({ address: this.address + ' ' + ' ' + this.city + ' ' + this.pincode }, (results: any, status: any) => {
    //     if (status == 'OK' && results && results.length) {
    //       this.lat = results[0].geometry.location.lat();
    //       this.lng = results[0].geometry.location.lng();
          this.util.show();
          const param = {
            uid: localStorage.getItem('uid'),
            address: this.address,
            lat: this.lat,
            lng: this.lng,
            title: this.title,
            pincode: this.pincode,
            customer_name:this.name,
            customer_email:this.email,
            customer_phone:this.mobile,
            city:this.city
          };
          this.api.post_private('v1/address/addNew', param).then((data: any) => {
            this.util.hide();
            if (data && data.status == 200) {
              this.util.publishNewAddress();
              this.util.onBack();
              this.util.showToast('Address added', 'success', 'bottom');
            } else {
              this.util.errorToast(this.util.translate('Something went wrong'));
            }
          }, error => {
            console.log(error);
            this.util.hide();
            this.util.errorToast(this.util.translate('Something went wrong'));
          }).catch(error => {
            console.log(error);
            this.util.hide();
            this.util.errorToast(this.util.translate('Something went wrong'));
          });
    //     } else {
    //       this.util.errorToast(this.util.translate('Please enter a valid address'));
    //       return false;
    //     }
    //   });
    // } else {
    //   this.util.errorToast(this.util.translate('Error while fetching google maps... please check your google maps key'));
    //   return false;
    // }


  }

  updateAddress() {
    if (this.address == '' || this.pincode == '' || this.name == '' || this.email == '' || this.mobile == '') {
      this.util.errorToast(this.util.translate('All Fields are required'));
      return false;
    }
    // if (typeof google == 'object' && typeof google.maps == 'object') {

    //   const geocoder = new google.maps.Geocoder;
    //   geocoder.geocode({ address: this.address + ' ' + ' ' + this.city + ' ' + this.pincode }, (results: any, status: any) => {
    //     if (status == 'OK' && results && results.length) {
    //       this.lat = results[0].geometry.location.lat();
    //       this.lng = results[0].geometry.location.lng();
          const param = {
            id: this.id,
            uid: localStorage.getItem('uid'),
            address: this.address,
            lat: this.lat,
            lng: this.lng,
            title: this.title,
            pincode: this.pincode,
            customer_name:this.name,
            customer_email:this.email,
            customer_phone:this.mobile,
            city:this.city
          };
          this.util.show();
          this.api.post_private('v1/address/updateMyAddress', param).then((data: any) => {
            this.util.hide();
            if (data && data.status == 200) {
              this.util.publishNewAddress();
              this.util.onBack();
              this.util.showToast('Address updated', 'success', 'bottom');
            } else {
              this.util.errorToast(this.util.translate('Something went wrong'));
            }
          }, error => {
            console.log(error);
            this.util.hide();
            this.util.errorToast(this.util.translate('Something went wrong'));
          });
        // } else {
        //   this.util.errorToast(this.util.translate('Something went wrong'));
        //   return false;
        // }
     // });
    // } else {
    //   this.util.errorToast(this.util.translate('Error while fetching google maps... please check your google maps key'));
    //   return false;
    // }

  }

  back() {
    this.util.onBack();
  }
  async openMap() {
    const modal = await this.modalController.create({
      component: MapComponent,
      cssClass: 'custom_modal',
      backdropDismiss: false,
      //componentProps: { id: this.orderId }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.address = dataReturned.data.address;
        this.lat = dataReturned.data.lat;
        this.lng = dataReturned.data.lng;
        this.city = dataReturned.data.city;
        //this.pincode = dataReturned.data.zipcode;
      }
    });

    return await modal.present();
  }
}
