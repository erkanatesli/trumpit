import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FingerprintAIO } from 'ionic-native';
import {DataService} from "../../providers/DataService";
import {UploadPage} from "../upload/upload"
// import { AndroidFingerprintAuth } from 'ionic-native';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DataService]
})
export class HomePage implements OnInit {

  plusIcon: string = "add";
  files: Array<Object>;
  userCount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataService) {
    this.getFiles();
  }

  public getFiles() {
      this.files = this.dataService.getMockFiles()
      this.userCount = this.files.length;
  }

  public newTransfer() {
    this.navCtrl.push(UploadPage);
  }

  public showtext = () => {
    console.log('hi');
  }

  ngOnInit() {
    this.check();
  }

  check(){
    console.log('check');
    FingerprintAIO.isAvailable().then(result =>{
      this.show();
      console.log(result);
    }).catch(err => {
      alert('no fingerprint');
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
