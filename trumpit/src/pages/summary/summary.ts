import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DataService} from "../../providers/DataService";
import {AlertController} from 'ionic-angular';

/*
 Generated class for the Summary page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
  providers: [DataService]
})
export class SummaryPage {

  myJSON: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    // this.callService();

    // console.log(this.dataService.getDeviceDetails());
    // this.showAlert(this.dataService.getDeviceDetails());

    console.log('ionViewDidLoad SummaryPage');
  }

  // private callService() {
  //   this.dataService.getURL('http://newplanner.testwilliam.mockable.io/doorgeven/RN00000004860591').subscribe(
  //     data => {
  //       this.myJSON = data.results;
  //       console.log('Response:',data);
  //     },
  //     err => {
  //       console.log(err);
  //     },
  //     () => console.log('Call Complete')
  //   );
  // }

  // private showAlert(value) {
  //   let alert = this.alertCtrl.create({
  //     title: 'Device Info',
  //     subTitle: value,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }



}
