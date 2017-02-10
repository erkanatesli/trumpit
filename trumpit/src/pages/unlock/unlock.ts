import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {UploadProvider} from "../../providers/upload-provider";

@Component({
  selector: 'page-unlock',
  templateUrl: 'unlock.html',
  providers: [UploadProvider]
})
export class Unlock {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  contacts: Array<string>;
  numberOfContacts: number;
  gpsIcon: string = "locate";
  fpIcon: string = "finger-print";

  constructor(public navCtrl: NavController, public navParams: NavParams, private uploadProvider: UploadProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('item');


    this.contacts = this.uploadProvider.getContacts();
    this.numberOfContacts = this.contacts.length;
    this.createStyle(this.numberOfContacts);


  }

  pingContact() {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(Unlock, {
    //   item: item
    // });
  }

  // private createStyle(numberOfElements, index) {
  private createStyle(numberOfElements){
    // let rotation = this.calculateDegrees(numberOfElements);
    // let style = {
    //   ""
    // }

  }

  private calculateDegrees(numberOfElements) {
    return 360 * Math.round(1 / numberOfElements);
  }
}
