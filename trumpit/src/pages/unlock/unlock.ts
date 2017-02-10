import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {UploadProvider} from "../../providers/upload-provider";
import {Observer} from "rxjs";

@Component({
  selector: 'page-unlock',
  templateUrl: 'unlock.html',
  providers: [UploadProvider]
})
export class Unlock {
  selectedItem: any;
  items: Array<{title: string, note: string, icon: string}>;
  user: Object;
  contacts: Array<Object> = [];
  gpsIcon: string = "locate";
  fpIcon: string = "finger-print";
  keyIcon: string = "key";
  checkmark: string = "checkmark";
  authenticatedContacts: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private uploadProvider: UploadProvider) {
    this.user = {
      userid: "Nicolas",
      gps: false,
      fp: false
    };

    this.splitData(this.uploadProvider.getContacts(), this.user);
    // this.getData();
  }

  getData(){
    this.uploadProvider.retrieveData()
      .subscribe((data:Object) =>
      {
        this.splitData(data, this.user)
      })
  }

  splitData(data, _user) {
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

  public checkStatus() {

  }

}
