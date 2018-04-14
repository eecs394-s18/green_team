import { Component, ViewChild } from '@angular/core';
import { IonicPage, Content, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import * as firebase from 'Firebase';
import * as objectHash from 'object-hash';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.allUsers = {};
    this.chosenUsers = [];
    this.existingChats = {};
    this.nameToUUID = {}; // Map username to UUID in allUsers
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Getting chats...'
    });
    this.loading.present();

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

  // chatUser(user): void {
  //
  //   const rooms = firebase.database().ref('chatrooms');
  //   const currUser = firebase.auth().currentUser;
  //   const email_set = new Set([currUser.email,user.email]);
  //   var key = '', nickname = currUser.displayName, otherNickname = user.username, roomFound = false;
  //   const chatID = objectHash(email_set);
  //
  //   //check if in ddb
  //   // theres some weird bug here but it seems to work anyways
  //   var new_chat = false;
  //   rooms.once('value')
  //   .then(function(snap){
  //     if(snap.child(chatID).exists()){
  //       console.log('chatroom already exists')
  //       console.log(user)
  //       new_chat = false;
  //     }
  //     else{
  //       new_chat=true;
  //       console.log('chatroom does not exist')
  //     }
  //   })
  //   //its not in db
  //   // this will probably screw up the chat history
  //   if(new_chat){
  //     var tmp = {}
  //     tmp[chatID] = {}
  //     tmp[chatID]['members'] = {}
  //     tmp[chatID]['members'][nickname] = true;
  //     tmp[chatID]['members'][otherNickname] = true;
  //
  //     rooms.update(tmp)
  //   }
  //
  //
  //   this.navCtrl.setRoot(ChatPage, {
  //     key: chatID,
  //     nickname: nickname,
  //     otherNickname: otherNickname
  //   });
  // }

}
