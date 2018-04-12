import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import * as firebase from 'Firebase';

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})

export class MatchPage {

  public allUsers;
  public chosenUsers;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.allUsers = {};
    this.chosenUsers = [];
  }

  ionViewDidLoad() {
    const ref = firebase.database().ref('users');
    const users = ref.on('value', snapshot => {
      this.allUsers = snapshot.val();
      this.selectUsers();
    });
  }

  selectUsers() {
    // TODO: Algorithm for matching users goes here.

    let keys:string[] = Object.keys(this.allUsers);
    for (let i:number = 0; i < 4; i++) {
      this.chosenUsers.push(this.allUsers[keys[i]]);
    }
  }
}
