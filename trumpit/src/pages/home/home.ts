import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FingerprintAIO } from 'ionic-native';
// import { AndroidFingerprintAuth } from 'ionic-native';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // declare var Media:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad HomePage');
  // }

  public showtext = () => {
    console.log('hi');
  }

  check(){
    console.log('check');
    FingerprintAIO.isAvailable().then(result =>{
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  }

  show(){
      console.log('show');
      FingerprintAIO.show({
       clientId: "Fingerprint-Demo"
   }).then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      });
    }

}
