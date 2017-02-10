import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
import { SelectUsers } from './selectUsers/selectUsers';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage implements OnInit{
  private selectedUsers: Array<any>;
  private authLayers: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.selectedUsers = [];
    this.authLayers = [
      {"authMethod": "GPS Location", "activated": false},
      {"authMethod": "Fingerprint", "activated": false},
      {"authMethod": "Blood Sample", "activated": false},
      {"authMethod": "Facialrecognition", "activated": false},
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  private selectUsers() {
    let modal = this.modalCtrl.create(SelectUsers);
    modal.present();
    modal.onDidDismiss(data => {
      this.selectedUsers = data;
      console.log(data);
    });
  }

  private sendMessage() {
    console.log(this.selectedUsers);
    console.log(this.authLayers);
  }

}
