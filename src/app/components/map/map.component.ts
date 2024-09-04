import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  lat:any;
  lng:any;
  city:any;
  zipcode:any;
  marker: any;
  geocoder: any;
  searchQuery: string = '';
  predictions: any[] = [];
  constructor(private modalController: ModalController) { }

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    const mapOptions = {
      center: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      },
      zoom: 15,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.marker = new google.maps.Marker({
      position: mapOptions.center,
      map: this.map,
      draggable: true,
    });

    this.geocoder = new google.maps.Geocoder();
    this.getAddressString(mapOptions.center);
    google.maps.event.addListener(this.marker, 'dragend', (event:any) => {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.getAddressString(newPosition);
    });
  }
getAddressString(newPosition:any){
  this.lat = newPosition.lat;
  this.lng = newPosition.lng;
  this.geocoder.geocode({ location: newPosition }, (results:any, status:any) => {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        const address = results[0].formatted_address;
        this.searchQuery = address;
        const addressComponents = results[0].address_components;
        for (const component of addressComponents) {
        
          if (component.types.includes('locality')) {
            this.city = component.long_name;
            break;
          }
          if (component.types.includes('postal_code')) {
            this.zipcode = component.long_name;
            break;
          }
        }
      } else {
        console.log('No results found');
      }
    } else {
      console.log('Geocoder failed due to:', status);
    }
  });
}
  searchPlace(event: any) {
    if(this.searchQuery.length < 3)
      return;
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: this.searchQuery }, (predictions:any, status:any) => {
      this.predictions = predictions;
    });
  }

  selectPlace(prediction: any) {
    const service = new google.maps.places.PlacesService(this.map);
    service.getDetails({ placeId: prediction.place_id }, (result:any, status:any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.map.setCenter(result.geometry.location);
        this.marker.setPosition(result.geometry.location);
        this.getAddressString(result.geometry.location);
        this.predictions = [];
      }
    });
  }
  dismissMap(){
    this.modalController.dismiss({
      'address': this.searchQuery,
      'lat':this.lat,
      'lng':this.lng,
      'city':this.city,
      'zipcode':this.zipcode
    });


  }
}