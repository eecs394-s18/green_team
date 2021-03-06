import { Component } from '@angular/core';
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
  private UUIDToChatID;
  private currentUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.allUsers = {};
    this.chosenUsers = [];
    this.existingChats = {};
    this.UUIDToChatID = {}; // Map target uuid to chat ID to allow for easy joining
    this.currentUser = firebase.auth().currentUser;
  }

  ionViewDidEnter() {
    this.allUsers = {};
    this.chosenUsers = [];
    this.existingChats = {};
    this.UUIDToChatID = {}; // Map target uuid to chat ID to allow for easy joining
    this.currentUser = firebase.auth().currentUser;
    
    this.loading = this.loadingCtrl.create({
      content: 'Getting chats...'
    });
    this.loading.present();

    if (this.currentUser == null) {
      this.loading.dismiss();
      this.presentText('You are not signed in. Please sign in and try again.');
    } else {
      const ref = firebase.database().ref('users');
      ref.on('value', snapshot => {
        this.allUsers = snapshot.val();
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
      var unix_ts_to_obj = {}; // Map unix timestamp -> obj (target user)

      for (var key in chats) {
        if (chats.hasOwnProperty(key)) {
          if (currUser.uid in chats[key]['members']) {
            delete chats[key]['members'][currUser.uid];
            let obj = this.allUsers[Object.keys(chats[key]['members'])[0]];
            obj['id'] = Object.keys(chats[key]['members'])[0];
            // add test to make sure at least one message exists
            if (chats[key].hasOwnProperty('chats')) {
                let msg_keys = Object.keys(chats[key]['chats']);
                let sender = chats[key]['chats'][msg_keys[msg_keys.length - 1]]['user'];

                obj['last_msg'] = (sender == currUser.displayName ? 'Me: ' : sender + ': ') + chats[key]['chats'][msg_keys[msg_keys.length - 1]]['message'];
                unix_ts_to_obj[chats[key]['chats'][msg_keys[msg_keys.length - 1]]['unix_ts']] = obj;
            }
            else {
                obj['last_msg'] = undefined;
                unix_ts_to_obj[(new Date()).getTime() / 1000] = obj;
            }

            this.UUIDToChatID[Object.keys(chats[key]['members'])[0]] = key;
          }
        }
      }

      // Sort chats by unix timestamp
      var sortedTS = [];
      sortedTS = Object.keys(unix_ts_to_obj).sort().reverse();
      for (var i in sortedTS) {
        this.chosenUsers.push(unix_ts_to_obj[sortedTS[i]]);
      }
      this.loading.dismiss();
    });
  }

  chatUser(user): void {
    this.navCtrl.push(ChatPage, {
      key: this.UUIDToChatID[user.id], // key of the chatroom
      nickname: firebase.auth().currentUser.displayName,
      otherNickname: user.username,
      matches: false
    });
  }

}
