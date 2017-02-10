import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController} from 'ionic-angular';

@Component({
  selector: 'selectUsers',
  templateUrl: 'selectUsers.html'
})
export class SelectUsers implements OnInit{
  public users: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {

  }

  ngOnInit() {
    this.users = [
      {"Username": "Jackie", "Selected": false},
      {"Username": "William", "Selected": false},
      {"Username": "Nicolas", "Selected": false}
    ]

  }

  close() {
    let selectedUsers: Array<any> = [];
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].Selected === true){
        // console.log(this.users[i].Username);
        selectedUsers.push(this.users[i]);
      }
    }
    this.viewCtrl.dismiss(selectedUsers);
  }

}
