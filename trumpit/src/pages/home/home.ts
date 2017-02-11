import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FingerprintAIO } from 'ionic-native';
import {DataService} from "../../providers/DataService";
import {UploadPage} from "../upload/upload"
import {Unlock} from "../unlock/unlock"
import {Transfer} from "../classes/transfer";
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
export class HomePage {

  plusIcon: string = "add";
  files: Array<Object>;
  userCount: Array<number> = [];
  transfers: Array<Transfer>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataService) {
    this.getFiles();
  }

  private getFiles() {
    this.transfers = this.dataService.getDashboard()
    console.log('transfers', this.transfers);

  }

  public newTransfer() {
    this.navCtrl.push(UploadPage);
  }

  public goUnlockScreen() {
    this.navCtrl.push(Unlock);
  }

  ngOnInit() {

  }



}
