import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Contacts } from '../pages/contacts/contacts';
import { Unlock } from '../pages/unlock/unlock';
import { HomePage } from "../pages/home/home";
import { UploadPage } from "../pages/upload/upload";
import { gpsLocation } from "../pages/gpsLocation/gpsLocation";
import { HttpModule } from '@angular/http';
import { SelectUsers } from "../pages/upload/selectUsers/selectUsers";

@NgModule({
  declarations: [
    MyApp,
    Contacts,
    Unlock,
    HomePage,
    UploadPage,
    gpsLocation,
    SelectUsers
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Contacts,
    Unlock,
    HomePage,
    UploadPage,
    gpsLocation,
    SelectUsers
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
