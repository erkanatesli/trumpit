import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Contacts } from '../pages/contacts/contacts';
import { Unlock } from '../pages/unlock/unlock';
import { HomePage } from '../pages/home/home';
import {SummaryPage} from  "../pages/summary/summary";
import { AuthoptionsPage} from "../pages/authoptions/authoptions";
import { UploadPage } from "../pages/upload/upload";
import { gpsLocation } from "../pages/gpsLocation/gpsLocation";
import { SelectUsers } from "../pages/upload/selectUsers/selectUsers";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Contacts', component: Contacts },
      { title: 'Unlock', component: Unlock },
      { title: 'Home', component: HomePage},
      { title: 'Summary', component: SummaryPage},
      { title: 'Authentication Options', component: AuthoptionsPage},
      { title: 'Upload', component: UploadPage},
      { title: 'gpsLocation', component: gpsLocation}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
