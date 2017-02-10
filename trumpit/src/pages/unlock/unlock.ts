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

  constructor(public navCtrl: NavController, public navParams: NavParams, private uploadProvider: UploadProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('item');
    //
    // // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];
    //
    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }

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

  private createStyle(numberOfElements, index) {
    let rotation = this.calculateDegrees(numberOfElements);
    let style = {
      ""
    }

  }

  private calculateDegrees(numberOfElements) {
    return 360 * Math.round(1 / numberOfElements);
  }
}
