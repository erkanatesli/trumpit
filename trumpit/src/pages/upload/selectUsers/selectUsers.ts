import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ModalController, ViewController} from 'ionic-angular';
import {DataService} from "./../../../providers/DataService";

@Component({
  selector: 'selectUsers',
  templateUrl: 'selectUsers.html',
  providers: [DataService]
})
export class SelectUsers implements OnInit {
  public users: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController, public dataService: DataService) {

  }

  ngOnInit() {
    this.getUsers();
    this.users = [];
  }

  private getUsers() {
    //start spinner
    this.dataService.getURL('users').subscribe(
      data => {
        this.users = data;
        // console.log('key', this.users, this.users.length);

        for (var i = 0; i <= this.users.length-1; i++) {
          this.users[i].selected = false;
        }

    // this.users = [
    //   {"Username": "Jackie", "Selected": false},
    //   {"Username": "William", "Selected": false},
    //   {"Username": "Nicolas", "Selected": false},
    //   {"Username": "Rohit", "Selected": false},
    //   {"Username": "Ahmet", "Selected": false},
    //   {"Username": "Erkan", "Selected": false},
    //   {"Username": "Ka Long", "Selected": false},
    // ]

        // console.log('Response:', data);
      },
      err => {
        console.log(err);
      },
      //stop spinner
      () => console.log('Call Complete')
    );
  }

  close() {
    let selectedUsers: Array<any> = [];
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].selected === true) {
        // console.log(this.users[i].Username);
        selectedUsers.push(this.users[i]);
      }
    }
    this.viewCtrl.dismiss(selectedUsers);
  }

}
