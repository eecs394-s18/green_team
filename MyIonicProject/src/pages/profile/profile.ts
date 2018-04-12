import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public person: {username: string, email: string, country: string, languages: string};
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person = {username: undefined, email: undefined, country: undefined, languages: undefined};
    this.user = firebase.auth().currentUser;
  }

  ionViewDidLoad(){
    firebase.database().ref('/users/' + this.user.uid).once('value', snapshot => {
        const userData = snapshot.val();
        if (userData) {
          this.person = userData;
        }
    });
  }

  // Get a reference to the database service
  // save the user's profile into Firebase so we can list users,
  // use them in Security and Firebase Rules, and show profiles
  save() {
    firebase.database().ref('users/' + this.user.uid)
      .set({
        username: this.person.username,
        email: this.person.email,
        country: this.person.country,
        languages: this.person.languages
      })
      .then(ref => {
        this.user.updateProfile({
          displayName: this.person.username,
          photoURL: ""
        }).then(() => {
          this.user.updateEmail(this.person.email).then(() => {
            console.log("profile successfully updated!")
          }).catch(error => {
            console.log(error.message);
          })
        }).catch(error => {
          console.log(error.message);
        })
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  // TODO: Finish resetting profile
  reset(): void {
    console.log('reset profile to defaults');
  }

}
