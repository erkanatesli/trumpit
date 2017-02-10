import { Component } from '@angular/core';

import {NavController, NavParams, ToastController} from 'ionic-angular';
import {UploadProvider} from "../../providers/upload-provider";
import {Observer} from "rxjs";
import { FingerprintAIO } from 'ionic-native';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'page-unlock',
  templateUrl: 'unlock.html',
  providers: [UploadProvider]
})
export class Unlock {
  public gpsLocation;
  public gpsLocation_latitude;
  public gpsLocation_longitude;
  selectedItem: any;
  items: Array<{title: string, note: string, icon: string}>;
  user: Object;
  contacts: Array<Object> = [];
  gpsIcon: string = "locate";
  fpIcon: string = "finger-print";
  keyIcon: string = "key";
  checkmark: string = "checkmark";
  authenticatedContacts: Array<Object> = [];
  allAuthenticated: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private uploadProvider: UploadProvider, private toastCtrl: ToastController) {
    this.user = {
      userid: "Nicolas",
      gps: false,
      fp: false
    };

    this.splitData(this.uploadProvider.getContacts(), this.user);
    // this.getData();
  }

  private getData(){
    this.uploadProvider.retrieveData()
      .subscribe((data:Object) =>
      {
        this.splitData(data, this.user)
      })
  }

  private splitData(data, _user) {
    console.log(data);
    for (let i in data) {
      if(data[i].userid === _user.userid){
        _user.gps = data[i].gps;
        _user.fp = data[i].fp;
      }
      if (data[i].gps === true && data[i].fp === true) {
        this.authenticatedContacts.push(data[i]);
      } else {
        this.contacts.push(data[i]);
      }
    }
    if (this.contacts.length === 0) {
      //goto view
    }
  }

  public checkStatus(t) {

    if (this.contacts.length === 0) {
      // goto next page
    } else {
      this.showErrorToast();
    }
  }

  private showErrorToast() {
    let toast = this.toastCtrl.create({
      message: 'NOT AUTHORIZED',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public authenticateFP = () => {
    console.log('hi');
    this.getGeo();
    this.check();
  }

  check(){
    console.log('check');
    FingerprintAIO.isAvailable().then(result =>{
      this.show();
    }).catch(err => {
      alert('no fingerprint');
    });
  }

  show(){
      FingerprintAIO.show({
       clientId: "Fingerprint-Demo",
       clientSecret: "password"
   }).then(result => {
        alert('post to backend');
        console.log(result);
      }).catch(err => {
        console.log(err);
      });
    }

    getGeo() {
      Geolocation.getCurrentPosition().then((position) => {
          this.gpsLocation = position;
          this.gpsLocation_latitude = position.coords.latitude;
          this.gpsLocation_longitude = position.coords.longitude;

          }, (err) => {
            console.log(err);
          });
    }

}
