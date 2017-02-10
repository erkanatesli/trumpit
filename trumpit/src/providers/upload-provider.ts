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
    this.url = "http://bla.com/contacts"
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
    }];
    return cont;


    //
  }
  retrieveData() : Observable<Object> {
    return Observable.interval(2000)
      .switchMap((res) =>
        this.http.get(this.url)
          .map((res:Response, i:number)=> res.json().data));
  }


}

