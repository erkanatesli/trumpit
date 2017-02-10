import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from "../../providers/DataService";
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService) {

  }

  ionViewDidLoad() {

    this.dataService.searchMovies('http://newplanner.testwilliam.mockable.io/doorgeven/RN00000004860591').subscribe(
      data => {
        this.myJSON = data.results;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Movie Search Complete')
    );

    console.log('ionViewDidLoad SummaryPage');
  }

}
