import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.person = {username: undefined, email: undefined, country: undefined, languages: undefined};
    this.user = firebase.auth().currentUser;
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Getting profile...'
    });
    loading.present();

    firebase.database().ref('/users/' + this.user.uid).once('value', snapshot => {
        const userData = snapshot.val();
        if (userData) {
          loading.dismiss();
          this.person = userData;
        } else {
          loading.dismiss();
          this.presentText('Unable to get your profile. Please try again.');
        }
    });
  }

  presentText(text) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: text
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }

  // Get a reference to the database service
  // save the user's profile into Firebase so we can list users,
  // use them in Security and Firebase Rules, and show profiles
  save() {
    let loading = this.loadingCtrl.create({
      content: 'Updating profile...'
    });
    loading.present();

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
            loading.dismiss();
            this.presentText('Success!')
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
