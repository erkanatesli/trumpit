import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Device} from 'ionic-native';
import {Transfer} from "../pages/classes/transfer";


export class DataService {
  static get parameters() {
    return [[Http]];
  }

  constructor(private http: Http, private device: Device) {

  }

  getURL(url) {
    var baseURL = "http://trumpit.testwilliam.mockable.io/ppapi/v1-0/";
    var response = this.http.get(baseURL + url).map(res => res.json());
    return response;
  }

  postData(data, url) {
    var baseURL = "http://trumpit.testwilliam.mockable.io/ppapi/v1-0/";
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var response = this.http.post(
      baseURL + url,
      JSON.stringify(data),
      {headers: headers}
    ).map(
      (res: Response) => res.json()
    )
    return response;


    // var response = this.http.post(baseURL + url).map(res => res.json());
    // return response;
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

  public getMockFiles(): Array<Transfer> {
    let transfers = new Array<Transfer>();
    let transfer1 = new Transfer("Your_mom.png",
                                ["Ahmet", "Erkan", "Nicolas"],
                                ["Gps, FingerPrint"]);
    transfers.push(transfer1);
    let transfer2 = new Transfer("Classified.pdf",
                                ["Wiliam", "Rohit", "Ahmet", "Erkan", "Nicolas"],
                                ["Gps, FingerPrint"]);
    transfers.push(transfer2);
    let transfer3 = new Transfer("private.doc",
                                ["Ko", "Jackie", "Nicolas"],
                                ["Gps, FingerPrint"]);
    transfers.push(transfer3);
    let transfer4 = new Transfer("Agreement.doc",
                                ["Ahmet", "Jackie", "Ko"],
                                ["Gps, FingerPrint"]);
    transfers.push(transfer4);
    let transfer5 = new Transfer("picture.jpg",
                                ["Rohit", "Erkan", "William", "Ko"],
                                ["Gps, FingerPrint"]);
    transfers.push(transfer5);
    return transfers;
  }

}
