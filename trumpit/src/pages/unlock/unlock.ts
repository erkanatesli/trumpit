import { Component, OnDestroy } from '@angular/core';

import {NavController, NavParams, ToastController} from 'ionic-angular';
import {UploadProvider} from "../../providers/upload-provider";
import { FingerprintAIO } from 'ionic-native';
import { Geolocation } from 'ionic-native';
import {Observable} from 'rxjs/Rx';

import {DataService} from '../../providers/DataService';


@Component({
  selector: 'page-unlock',
  templateUrl: 'unlock.html',
  providers: [UploadProvider, DataService]
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
  user1: any;
  contacts: Array<Object> = [];
  gpsIcon: string = "locate";
  fpIcon: string = "finger-print";
  keyIcon: string = "key";
  checkmark: string = "checkmark";
  authenticatedContacts: Array<Object> = [];
  allAuthenticated: boolean = false;
  urlGif: string;
  public checker;


  constructor(public navCtrl: NavController, public dataService: DataService, public navParams: NavParams, private uploadProvider: UploadProvider, private toastCtrl: ToastController) {
    this.user1 = {
      userid: this.dataService.getUDID(),
      gps: {
        latitude: '',
        longitude: ''
      },
      fp: false
    };
    this.user = {
      userid: this.dataService.getUDID(),
      gps: false,
      fp: false
    };
    this.allOK = false;
    this.readFile = "";


    this.checker = Observable.interval(2500).subscribe((x) => {
      this.getGeo();
      //TODO POST user
      this.user1.gps.latitude = this.gpsLocation_latitude;
      this.user1.gps.longitude = this.gpsLocation_longitude;
      console.log(this.user1);

      this.getData();

    });

    // this.splitData(this.uploadProvider.getContacts(), this.user);
    this.getData();
  }

  private getData(){

    this.dataService.postData('test', "unlock").subscribe( //TODO real POST CALL
      res => {
        console.log("post response", res);
        this.VerifyAllStatus(res);
        this.splitData(res, this.user);
      })
  };

  public VerifyAllStatus(data) {
    let counter = 0;
    for (let i = 0; i < data.length; i++){
      if (data[i].gps === true && data[i].fp === true){
        counter++;
        console.log(counter);
      }
      if (counter === data.length){
        this.allOK = true;
        this.readFile = "" //TODO GET RESULT CALL
      }
      else {
        this.allOK = false;
        this.readFile = ""; //Clear file
      }
    }
  }

    // this.uploadProvider.retrieveData()
    //   .subscribe((data:Object) =>
    //   {
    //     console.log(data);
    //     this.splitData(data, this.user)
    //   })
  // }

  private splitData(data, _user) {
    console.log("First data", data);
    this.authenticatedContacts = [];
    this.contacts = [];
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
        this.user.fp = true;
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


    ngOnDestroy(){
      this.checker.unsubscribe();
    }


}
