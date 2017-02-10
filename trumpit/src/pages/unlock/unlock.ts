import { Component, OnDestroy } from '@angular/core';

import {NavController, NavParams, ToastController} from 'ionic-angular';
import {UploadProvider} from "../../providers/upload-provider";
import { FingerprintAIO } from 'ionic-native';
import { Geolocation } from 'ionic-native';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'page-unlock',
  templateUrl: 'unlock.html',
  providers: [UploadProvider]
})
export class Unlock implements OnDestroy {
  public gpsLocation;
  public gpsLocation_latitude;
  public gpsLocation_longitude;
  public allOK: boolean;
  public readFile: string;
  selectedItem: any;
  items: Array<{title: string, note: string, icon: string}>;
  user: any;
  contacts: Array<Object> = [];
  gpsIcon: string = "locate";
  fpIcon: string = "finger-print";
  keyIcon: string = "key";
  checkmark: string = "checkmark";
  authenticatedContacts: Array<Object> = [];
  allAuthenticated: boolean = false;
  urlGif: string;
  public checker;


  constructor(public navCtrl: NavController, public navParams: NavParams, private uploadProvider: UploadProvider, private toastCtrl: ToastController) {
    this.user = {
      userid: "Nicolas",
      gps: false,
      fp: false
    };
    this.allOK = false;
    this.readFile = "";

    this.urlGif = "../assets/icon/cat.gif";

    // Observable.interval(2000 * 60).subscribe(x => {
    this.checker = Observable.interval(2000).subscribe((x) => {
      // console.log('hi');
      this.getGeo();
    });

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
        data.splice(i, 1);
      } else if (data[i].gps === true && data[i].fp === true) {
        this.authenticatedContacts.push(data[i]);
      } else {
        this.contacts.push(data[i]);
      }
    }
    if (this.contacts.length === 0) {
      //goto view
    }
  }

  public checkStatus() {

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
    // console.log('hi');
    // this.getGeo();
    this.check();
  };

  check(){
    console.log('check');
    this.user.fp === true;
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

    public changeGif = () => {
      console.log('hiiii');
      this.urlGif = "https://media.giphy.com/media/9fbYYzdf6BbQA/giphy.gif";
    };

    ngOnDestroy(){
      this.checker.unsubscribe();
     }


    public testOK() {
      this.allOK = true;
      this.readFile = "";
      setTimeout(() => {
        this.allOK = false;
        console.log("Setting back to False");
      }, 3000);
    }

}
