import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the ProfileViewerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 // requires navParams with uid and a valid uid in the db to work
 // only displays name, country, and languages (interests not in db as of 4/24 @ 5pm)

@IonicPage()
@Component({
  selector: 'page-profile-viewer',
  templateUrl: 'profile-viewer.html',
})
export class ProfileViewerPage {
  public person:any;
  prof_pic:string;
  user:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storageProvider: StorageProvider) {

      this.person = {
          username: undefined,
          country: undefined,
          languages: undefined,
      };
      this.prof_pic = 'avatar.png';
      this.user = firebase.database().ref('/users/' + navParams.get('uid'));
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileViewerPage');
    this.user.once('value', snapshot => {
        this.person = snapshot.val();
        console.log(this.person)
        //replace avatar.png with the appropriate filename once picture uploads are complete
        this.storageProvider.getPictureURL(this.prof_pic).then(url => this.prof_pic = url);
    });
    console.log(this.person);
  }
}
