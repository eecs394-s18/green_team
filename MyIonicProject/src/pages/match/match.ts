import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import * as firebase from 'Firebase';
import * as objectHash from 'object-hash';
@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})

export class MatchPage {


  public allUsers;
  public chosenUsers;
  private loading;
  currentUser: any;
  public person: {username: string, email: string, country: string, languages: string};

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.allUsers = {};
    this.chosenUsers = [];
    this.currentUser = firebase.auth().currentUser;

    //this.currentUser = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
    //console.log(this.currentUser)
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Getting matches...'
    });
    this.loading.present();

    const ref = firebase.database().ref('users');
    const users = ref.on('value', snapshot => {
      this.allUsers = snapshot.val();
      this.selectUsers();
    });

    if (this.currentUser == null) {
      this.loading.dismiss();
      this.presentText('You are not signed in. Please sign in and try again.')
    } else {
      firebase.database().ref('/users/' + this.currentUser.uid).once('value', snapshot => {
          const userData = snapshot.val();
          if (userData) {
            this.person = userData;
          }
      });
    }
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

  selectUsers() {
    // TODO: Algorithm for matching users goes here.

    let keys:string[] = Object.keys(this.allUsers);
    for (let i:number = 0; i < 5; i++) {
      this.chosenUsers.push(this.allUsers[keys[i]]);
    }
    this.loading.dismiss();
  }

  chatUser(user): void {

    const rooms = firebase.database().ref('chatrooms');
    //const currUser = firebase.auth().currentUser;
    const email_set = new Set([this.person.email, user.email]);
    var key = '', nickname = this.person.username, otherNickname = user.username, roomFound = false;
    const chatID = objectHash(email_set);
    console.log(nickname)
    console.log(chatID)

    // Check if in db
    rooms.once('value')
    .then(snap => {
      if(snap.child(chatID).exists()) {
        console.log('chatroom already exists')
        this.navigateToChat(chatID, nickname, otherNickname);
      }
      else {
        console.log('chatroom does not exist, create new')
        var tmp = {}
        tmp[chatID] = {}
        tmp[chatID]['members'] = {}
        tmp[chatID]['members'][nickname] = true;
        tmp[chatID]['members'][otherNickname] = true;

        console.log('outside: ', this);

        rooms.update(tmp).then(res => {
          console.log('inside: ', this);
          this.navigateToChat(chatID, nickname, otherNickname);
        }).catch(error => {
          console.log(error.message);
        })
      }
    })
  }

  navigateToChat(chatID, nickname, otherNickname) {
    this.navCtrl.setRoot(ChatPage, {
      key: chatID,
      nickname: nickname,
      otherNickname: otherNickname,
      matches: true
    });
  }
}
