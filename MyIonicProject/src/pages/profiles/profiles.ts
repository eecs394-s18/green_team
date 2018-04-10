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

  // profiles = [];
  // data = { profile:'' };
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	let ref = firebase.database().ref('profiles/').push();
    ref.set({
      profile:"test"
    });
    
  // 	this.ref.on('value', resp => {
  //   this.profiles = [];
  //   this.profiles = snapshotToArray(resp);
  // });

  }

  // addProfile() {
  //   let newData = this.ref.push();
  //   newData.set({
  //     email:this.data.email
  //     });
  // this.navCtrl.pop();
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilesPage');
  }

}

// export const snapshotToArray = snapshot => {
//     let returnArr = [];

//     snapshot.forEach(childSnapshot => {
//         let item = childSnapshot.val();
//         item.key = childSnapshot.key;
//         returnArr.push(item);
//     });

//     return returnArr;
// };
