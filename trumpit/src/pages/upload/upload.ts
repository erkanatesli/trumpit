import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {SelectUsers} from './selectUsers/selectUsers';
import {Camera} from 'ionic-native';
import {DataService} from "./../../providers/DataService";
import {AlertController} from 'ionic-angular';

import {HomePage} from "../home/home"

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
  providers: [DataService]
})
export class UploadPage implements OnInit {
  private selectedUsers: Array<any>;
  private authLayers: Array<any>;
  private secretFile: string;
  private subjectName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public dataService: DataService, public alertCtrl: AlertController) {

  }

  showConfirm() {
     let confirm = this.alertCtrl.create({
       title: 'Send Message?',
       buttons: [
         {
           text: 'Cancel',
           handler: () => {
             console.log('Disagree clicked');
           }
         },
         {
           text: 'Confirm',
           handler: () => {
             console.log('Agree clicked');
             this.sendMessage();
           }
         }
       ]
     });
     confirm.present();
   }

  ngOnInit() {
    this.selectedUsers = [];
    this.subjectName = "";
    this.authLayers = [
      {"authMethod": "GPS Location", "activated": false},
      {"authMethod": "Fingerprint", "activated": false},
      {"authMethod": "Blood Sample", "activated": false},
      {"authMethod": "Facial Recognition", "activated": false},
      {"authMethod": "Stool Sample", "activated": false}
    ];
    // this.secretFile = "data:image/png;base64,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";
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
    console.log('Sendmessage');

    //creating object
    let authData = [];
    for (var i = 0; i <= this.authLayers.length - 1; i++) {
      if (this.authLayers[i].activated) {
        authData.push({"name": this.authLayers[i].authMethod})
        console.log('is selected', this.authLayers[i]);
      }
    }

    let usersData = [];
    for (var i = 0; i <= this.selectedUsers.length - 1; i++) {
      usersData.push({"id": this.selectedUsers[i].relatieId})
    }

    let uploadData = {
      "senderId": this.dataService.getUDID(),
      "base64Image": this.secretFile,
      "authTypes": authData,
      "contacts": usersData,
      "subject": this.subjectName
    }

    console.log('UploadData', uploadData);

    this.dataService.postData(uploadData, "upload").subscribe(
      res => {
        console.log(res);
        if (res.succes){
        // If response is succesfull send to homepage
          this.navCtrl.push(HomePage);
        }
// =======
//       data => {
//
//
//         console.log('Response:', data);
//         // If response is succesfull send to homepage
//         if (data.succes) {
//
//           this.showConfirm();
//           console.log('YOU ARE HJERE')
//         }
//         else {
//           console.log("ERROR")
//         }
//         //
// >>>>>>> 8d3e8b181cb23f624b1f093552f399c3ce91c33a
      },
      err => {
        console.log(err);
      },
      //stop spinner
      () => console.log('Call Complete')
    );

    // console.log(this.selectedUsers);
    // console.log(this.authLayers);\
    console.log("Filename = " + this.subjectName);
  }

  private takePicture() {
    let options = {
      quality: 80,
      destinationType: 0,
      sourceType: Camera.PictureSourceType.CAMERA,
      // encodingType: Camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 300,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(imageData);
      this.secretFile = base64Image;
    }, (err) => {
      // Handle error
    });
  }

  private uploadPicture() {
    let options = {
      quality: 80,
      destinationType: 0,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      // encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 600,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(imageData);
      this.secretFile = base64Image;
    }, (err) => {
      // Handle error
    });
  }

}
