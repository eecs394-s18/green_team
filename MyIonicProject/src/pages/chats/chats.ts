import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import * as firebase from 'Firebase';
/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  public allUsers;
  public chosenUsers;
  public existingChats;
  private loading;
  private nameToUUID;
  private currentUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.allUsers = {};
    this.chosenUsers = [];
    this.existingChats = {};
    this.nameToUUID = {}; // Map username to UUID in allUsers
    this.currentUser = firebase.auth().currentUser;
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Getting chats...'
    });
    this.loading.present();

    if (this.currentUser == null) {
      this.loading.dismiss();
      this.presentText('You are not signed in. Please sign in and try again.');
    } else {
      const ref = firebase.database().ref('users');
      const users = ref.on('value', snapshot => {
        this.allUsers = snapshot.val();
        for (var uuid in this.allUsers) {
          if (this.allUsers.hasOwnProperty(uuid)) {
            this.nameToUUID[this.allUsers[uuid]['username']] = uuid;
          }
        }
        this.selectUsers();
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
    const currUser = firebase.auth().currentUser;
    const rooms = firebase.database().ref('chatrooms');

    rooms.once('value')
    .then(snap => {
      const chats = snap.val();
      for (var key in chats) {
        if (chats.hasOwnProperty(key)) {
          if (currUser.displayName in chats[key]['members']) {
            delete chats[key]['members'][currUser.displayName];
            this.chosenUsers.push(this.allUsers[this.nameToUUID[Object.keys(chats[key]['members'])[0]]]);
          }
        }
      }
      this.loading.dismiss();
    });
  }

  chatUser(user): void {
    this.navCtrl.setRoot(ChatPage, {
      key: this.nameToUUID[user.username],
      nickname: firebase.auth().currentUser.displayName,
      otherNickname: user.username
    });
  }

}
