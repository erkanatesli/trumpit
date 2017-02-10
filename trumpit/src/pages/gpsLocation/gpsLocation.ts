import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'gpsLocation',
  templateUrl: 'gpsLocation.html'
})
export class gpsLocation implements OnInit {
  public gpsLocation;
  public gpsLocation_latitude;
  public gpsLocation_longitude;

  private keepSending: boolean;

  constructor(public navCtrl: NavController){

  }

  ngOnInit() {
    this.keepSending = false;
    // this.sendGpsLocation();
  }

  private doFunction(){
    Geolocation.getCurrentPosition().then((position) => {
        this.gpsLocation = position;
        console.log(this.gpsLocation);
        this.gpsLocation_latitude = position.coords.latitude;
        this.gpsLocation_longitude = position.coords.longitude;

        }, (err) => {
          console.log(err);
        });

    this.keepSending = !this.keepSending;
    console.log("Keep sending GPS Location = " + this.keepSending);
    // while(this.keepSending){
    //   // this.sendGpsLocation();
    // }
    setTimeout(30000, console.log("SEND"));
  }

  private sendGpsLocation(){
      console.log("Latitude = " + this.gpsLocation_latitude + "Longitude = "  + this.gpsLocation_longitude);
  }
}
