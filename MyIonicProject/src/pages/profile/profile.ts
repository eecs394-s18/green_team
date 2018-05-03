import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
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
  public person: {username: string, email: string, grade: string, gender: string, country: string, cultures: string, languages: string, international: boolean};
  user: any;
  new: boolean;
  pic: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private storageProvider: StorageProvider) {

    this.person = {
      username: "",
      email: "",
      grade: "",
      country: "",
      languages: [],
      international: "",
      gender: "",
      cultures: []
    };
    this.new = this.navParams.get("new") as boolean;

    let email = this.navParams.get("email") as string;
    if (email) {
      this.person.email = email
    }
    this.user = firebase.auth().currentUser;
  }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      content: 'Getting profile...'
    });
    if (!this.new) {
      loading.present();
    }

    if (this.user == null) {
      loading.dismiss();
      this.presentText('You are not signed in. Please sign in and try again.');
    } else {
      firebase.database().ref('/users/' + this.user.uid).once('value', snapshot => {
          const userData = snapshot.val();
          if (userData) {
            loading.dismiss();
            this.person = userData;
          } else {
            loading.dismiss();
            if (!this.new) {
              this.presentText('Unable to get your profile. Please try again.');
            }
          }
      });
    }

    // BUG: Flag only shows when all required inputs are filled out?
    let rel = (this.person.country === "") ? 'avatar' : this.person.country;
    this.storageProvider.getPictureURL(rel + '.png').then(url => this.pic = url);
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

  // Capture change event when user selects a new country to update picture.
  onCountryChange(selected) {
    this.storageProvider.getPictureURL(selected + '.png').then(url => this.pic = url);
  }

  // Get a reference to the database service
  // save the user's profile into Firebase so we can list users,
  // use them in Security and Firebase Rules, and show profiles
  save() {
    console.log('person: ',this.person)
    let loading = this.loadingCtrl.create({
      content: 'Updating profile...'
    });
    loading.present();

    firebase.database().ref('users/' + this.user.uid)
      .set(this.person)
      .then(ref => {
        this.user.updateProfile({
          displayName: this.person.username
        }).then(() => {
          this.user.updateEmail(this.person.email).then(() => {
            loading.dismiss();
            this.presentText('Success!')
          }).catch(error => {
            loading.dismiss();
            this.presentText(error.message);
          })
        }).catch(error => {
          loading.dismiss();
          this.presentText(error.message);
        })
      })
      .catch(error => {
        loading.dismiss();
        this.presentText(error.message);
      })
  }
}
