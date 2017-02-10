import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
import { SelectUsers } from './selectUsers/selectUsers';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage implements OnInit{
  private selectedUsers: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.selectedUsers= ["Test"];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  private selectUsers() {
    let modal = this.modalCtrl.create(SelectUsers);
    modal.present();
  }

}
