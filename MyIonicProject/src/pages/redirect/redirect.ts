import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthPage } from '../auth/auth';
import { ChatsPage } from '../chats/chats';

import * as firebase from 'firebase';
/**
 * Generated class for the RedirectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redirect',
  templateUrl: 'redirect.html',
})
export class RedirectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedirectPage');
    firebase.auth().onAuthStateChanged((user) =>
    {
      if (user)
      {
        // User is signed in.
        console.log('signed in. go to Chats');
        this.navCtrl.setRoot(ChatsPage);
      }
      else
      {
        // No user is signed in.
        console.log('NOT signed in. go to Auth');
        this.navCtrl.setRoot(AuthPage);
      }
    });
  }

}
