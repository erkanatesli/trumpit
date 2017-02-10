import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Device} from 'ionic-native';

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

  getDeviceDetails(){
    var model = Device.model;
    var deviceID = Device.uuid;
    var str = Device.version;
    return "model: " + model + " udid: " + deviceID + " version: " + str;
  }

  getMockFiles() {
    let files = [{
      filename: "Your_mom.png",
      contacts: ["Ahmet", "Erkan", "Nicolas"],
      options:["Gps, FingerPrint"]
    },{
      filename: "Classified.pdf",
      contacts: ["Wiliam", "Rohit", "Ahmet", "Erkan", "Nicolas"],
      options:["Gps, FingerPrint"]
    },{
      filename: "private.doc",
      contacts: ["Ko", "Jackie", "Nicolas"],
      options:["Gps, FingerPrint"]
    },{
      filename: "Agreement.doc",
      contacts: ["Ahmet", "Jackie", "Ko"],
      options:["Gps, FingerPrint"]
    },{
      filename: "picture.jpg",
      contacts: ["Rohit", "Erkan", "William", "Ko"],
      options:["Gps, FingerPrint"]
    }];
    return files;
  }

}
