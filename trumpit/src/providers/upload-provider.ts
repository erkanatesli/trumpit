import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable, Subject} from "rxjs";

@Injectable()
export class UploadProvider {
  url: string;

  constructor(public http: Http) {
    this.http = http;
    // provider for uploading the file with the backend.
    this.url = "http://trumpit.testwilliam.mockable.io/ppapi/v1-0/unlock"
  }

  public getContacts() {
    let cont = [{
      userid:"William",
      gps: true,
      fp: true
    },{
      userid:"Erkan",
      gps: true,
      fp: false
    }, {
      userid:"Rohit",
      gps: false,
      fp: true
    },{
      userid: "253a52f99d98279e",
      gps: true,
      fp: false
    }];
    return cont;

  }
  public retrieveData() : Observable<Object> {
    console.log('retrieveData');
    return Observable.interval(2000)
      .switchMap((res) =>
        this.http.post(this.url, 'test')
          .map((res:Response, i:number)=> res.json().data));
  }


}
