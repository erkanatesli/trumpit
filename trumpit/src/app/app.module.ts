import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Contacts } from '../pages/contacts/contacts';
import { Unlock } from '../pages/unlock/unlock';
import {HomePage} from "../pages/home/home";
import {SummaryPage} from  "../pages/summary/summary";
import { AuthoptionsPage} from "../pages/authoptions/authoptions";
import { UploadPage } from "../pages/upload/upload";
import { gpsLocation } from "../pages/gpsLocation/gpsLocation";

@NgModule({
  declarations: [
    MyApp,
    Contacts,
    Unlock,
    HomePage,
    SummaryPage,
    AuthoptionsPage,
    UploadPage,
    gpsLocation
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Contacts,
    Unlock,
    HomePage,
    SummaryPage,
    AuthoptionsPage,
    UploadPage,
    gpsLocation
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
