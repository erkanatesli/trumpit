import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
import { SelectUsers } from './selectUsers/selectUsers';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage implements OnInit{
  private selectedUsers: Array<any>;
  private authLayers: Array<any>;
  private secretFile: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.selectedUsers = [];
    this.authLayers = [
      {"authMethod": "GPS Location", "activated": false},
      {"authMethod": "Fingerprint", "activated": false},
      {"authMethod": "Blood Sample", "activated": false},
      {"authMethod": "Facial Recognition", "activated": false},
      {"authMethod": "Stool Sample", "activated": false}
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

  private takePicture(){
    let options = {
      quality: 80,
      destinationType: 0,
      sourceType: Camera.PictureSourceType.CAMERA,
      // encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 600,
      saveToPhotoAlbum: false,
      correctOrientation:true
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

  private uploadPicture(){
    let options = {
      quality: 80,
      destinationType: 0,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      // encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 600,
      saveToPhotoAlbum: false,
      correctOrientation:true
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
