import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadProvider {

  constructor(public http: Http) {

    // provider for uploading the file with the backend.
  }

  public getContacts():Array<string> {
    let cont = ['Erkan', 'Jackie', 'William', 'Rohit', "Ka Long", "Ahmet", "Nicolas"];
    return cont;
  }

}

