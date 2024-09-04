
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CartService } from 'src/app/services/cart.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  fname: any;
  lname: any;
  mobile: any;
  gender: any;
  email: any;
  cover: any = '';
  edit_flag: boolean;
  constructor(
    public api: ApiService,
    public util: UtilService,
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    public cart: CartService
  ) {
    this.edit_flag = true;
    console.log(localStorage.getItem('uid'));
    this.getProfile();
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
        this.fname = info.first_name;
        this.lname = info.last_name;
        this.mobile = info.mobile;
        this.gender = info.gender;
        this.cover = info.cover;
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


  async updateProfile() {
    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Choose from'),
      buttons: [{
        text: this.util.translate('Camera'),
        icon: 'camera',
        handler: () => {
          console.log('camera clicked');
          this.upload(CameraSource.Camera);
        }
      }, {
        text: this.util.translate('Gallery'),
        icon: 'images',
        handler: () => {
          console.log('gallery clicked');
          this.upload(CameraSource.Photos);
        }
      }, {
        text: this.util.translate('Cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }

  update() {
    if (!this.fname || this.fname == '' || !this.lname || this.lname == '' || !this.mobile || this.mobile == '') {
      this.util.errorToast(this.util.translate('All Fields are required'));
      return false;
    }
    const param = {
      first_name: this.fname,
      last_name: this.lname,
      email: this.email,
      gender: this.gender,
      cover: this.cover,
      mobile: this.mobile,
      id: localStorage.getItem('uid')
    };
    this.util.show(this.util.translate('updating...'));
    this.api.post_private('v1/profile/update', param).then((data: any) => {
      this.util.hide();
      console.log(data);
      this.getProfile();
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

  back() {
    this.navCtrl.back();
  }

  async upload(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        source,
        quality: 20,
        resultType: CameraResultType.Base64
      });
      console.log('image output', image);
      if (image && image.base64String) {
        const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
        this.util.show(this.util.translate('Uploading..'));
        this.api.uploadImage('v1/uploadImage', blobData, image.format).then((data) => {
          console.log('image upload', data);
          this.util.hide();
          if (data && data.status == 200 && data.success == true && data.data.image_name) {
            this.cover = data.data.image_name;
            console.log('this cover', this.cover);
            const param = {
              cover: this.cover,
              id: localStorage.getItem('uid')
            };
            this.util.show(this.util.translate('updating...'));
            this.api.post_private('v1/profile/update', param).then((data: any) => {
              this.util.hide();
              console.log(data);
              this.getProfile();
            }, error => {
              console.log(error);
              this.util.hide();
              this.util.apiErrorHandler(error);
            }).catch(error => {
              console.log(error);
              this.util.hide();
              this.util.apiErrorHandler(error);
            });
          } else {
            console.log('NO image selected');
          }
        }, error => {
          console.log(error);
          this.util.hide();
          this.util.apiErrorHandler(error);
        }).catch(error => {
          console.log('error', error);
          this.util.hide();
          this.util.apiErrorHandler(error);
        });
      }
    } catch (error) {
      console.log(error);
      this.util.apiErrorHandler(error);
    }
  }

  b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  deleteAccount(){
    swal.fire({
      title: this.util.translate('Are you sure?'),
      text: this.util.translate('You want to delete your account? Account once deleted cannot be used to login again!'),
      icon: 'question',
      confirmButtonText: this.util.translate('Yes'),
      cancelButtonText: this.util.translate('Cancel'),
      showCancelButton: true,
      backdrop: false,
      background: 'white'
    }).then((data:any)=>{

      if(data.isConfirmed){
        this.util.show(this.util.translate('deleting...'));
        const param = {
          id: localStorage.getItem('uid')
        };
        this.api.post_private('v1/profile/delete', param).then(info => {
          this.util.hide();
          localStorage.removeItem('uid');
          localStorage.removeItem('token');
          this.cart.cart = [];
          this.cart.itemId = [];
          this.cart.totalPrice = 0;
          this.cart.grandTotal = 0;
          this.cart.coupon = null;
          this.cart.discount = null;
          this.util.navigateRoot('/tabs/account');
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
  
  }
    )
  }
}
