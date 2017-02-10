import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Device} from 'ionic-native';
import {Transfer} from "../pages/classes/transfer";


export class DataService {
  static get parameters() {
    return [[Http]];
  }
  baseURL: string;
  constructor(private http: Http, private device: Device) {
    // this.baseURL = "http://trumpit.testwilliam.mockable.io/ppapi/v1-0/";
    this.baseURL = "http://localhost:8080/ppapi/v1-0/";

  }

  getURL(url) {
    var response = this.http.get(this.baseURL + url).map(res => res.json());
    return response;
  }

  postData(data, url) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var response = this.http.post(
      this.baseURL + url,
      JSON.stringify(data),
      {headers: headers}
    ).map(
      (res: Response) => res.json()
    )
    return response;

  }

  getUDID() {
    return Device.uuid;
  }

  getModel() {
    return Device.model;
  }

  getVersion() {
    return Device.version;
  }

  getDashboard(): Array<Transfer> {
    let transfers = new Array<Transfer>();


    this.getURL('dashboard').subscribe(
      data => {

        console.log('data', data);
        for (var i = 0; i <= data.length - 1; i++) {
          let trans = new Transfer(data[i].subject,
            data[i].contacts,
            data[i].id);

          transfers.push(trans);

        }

        // console.log('Response:', data);
      },
      err => {
        console.log(err);
      },
      //stop spinner
      () => console.log('Call Complete')
    );

    return transfers;
  }

}
