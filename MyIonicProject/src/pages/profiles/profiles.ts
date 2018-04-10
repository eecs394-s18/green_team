import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import * as firebase from 'Firebase';

/**
 * Generated class for the ProfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html',
})
export class ProfilesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilesPage');
  }

}
