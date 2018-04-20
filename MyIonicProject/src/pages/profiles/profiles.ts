import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  data = { email: "", name: "", movie: "", password: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	// let ref = firebase.database().ref('profiles/').push();
   //  ref.set({
   //    profile:{
   //      "name":"conway"
   //    }
   //  });

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

  validateEmail(email): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Returns true if text contrains all spaces or is empty
  containsAllSpaces(text): boolean {
    console.log(text)
    console.log(text.replace(/\s/g, '').length)
    return text.replace(/\s/g, '').length == 0 ? true : false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilesPage');
  }

  submitProfile(){
    console.log('profile submitted!');
    console.log(this.data);

    if (this.validateEmail(this.data.email) && !this.containsAllSpaces(this.data.password)
        && !this.containsAllSpaces(this.data.name) && !this.containsAllSpaces(this.data.movie)) {
      // TODO: Error handling
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.data.email, this.data.password)
        .then(user => {
          firebase
            .auth().currentUser
            .updateProfile({
              displayName: this.data.name,
              photoURL: ""
            })
            .then(() => {
              console.log('success!')
            })
            .catch(error => {
              console.log(error.message);
            })
        })
        .catch(error => {
          console.log(error.message);
        })

      // Create user and add to database
      let ref = firebase.database().ref('profiles/').push();
      ref.set({
        profile:this.data,
      })
    } else {
      console.log('inputs are not valid')
    }
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
