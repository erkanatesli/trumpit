import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'gpsLocation',
  templateUrl: 'gpsLocation.html'
})
export class gpsLocation {
  public gpsLocation;
  public gpsLocation_latitude;
  public gpsLocation_longitude;

  constructor(public navCtrl: NavController) {

  }

  public doFunction(){
    Geolocation.getCurrentPosition().then((position) => {
        this.gpsLocation = position;
        console.log(gpsLocation);
        this.gpsLocation_latitude = position.coords.latitude;
        this.gpsLocation_longitude = position.coords.longitude;


        }, (err) => {
          console.log(err);
        });
  }

}
