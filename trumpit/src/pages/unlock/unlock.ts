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

  contacts: Array<Object> = [];
  gpsIcon: string = "locate";
  fpIcon: string = "finger-print";
  checkmark: string = "checkmark";
  authenticatedContacts: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private uploadProvider: UploadProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('item');

    this.splitData(this.uploadProvider.getContacts());
    // this.getData();
  }

  pingContact() {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(Unlock, {
    //   item: item
    // });
  }

  getData(){
    this.uploadProvider.retrieveData()
      .subscribe((data:Object) =>
      {
        this.splitData(data)
      })
  }

  splitData(data) {
    console.log(data);
    for (let i in data) {
      if (data[i].gps === true && data[i].fp === true) {
        this.authenticatedContacts.push(data[i]);
      } else {
        this.contacts.push(data[i]);
      }
    }
  }

}
