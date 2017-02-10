import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class Contacts implements OnInit {
  private contactList: Array<any>;

  constructor(public navCtrl: NavController) {
    this.contactList = [];

  }

  ngOnInit() {
    this.fillContactList();
  }

  private fillContactList(){
    this.contactList = [
      { "Username": "Jackie", "Image": "http://style.anu.edu.au/_anu/4/images/placeholders/person.png" },
      { "Username": "William", "Image": "http://style.anu.edu.au/_anu/4/images/placeholders/person.png"},
      { "Username": "Nicolas", "Image": "http://style.anu.edu.au/_anu/4/images/placeholders/person.png"}
    ]
  }

  public addContact(){
    this.contactList.push({
      "Username": "New Contact",
      "Image": "http://style.anu.edu.au/_anu/4/images/placeholders/person.png"
    });
  }

}
