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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.allUsers = {};
    this.chosenUsers = [];
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
    const currUser = firebase.auth().currentUser;
    const email_set = new Set([currUser.email,user.email])
    var key = '', nickname = currUser.displayName, otherNickname = user.username, roomFound = false;
    const chatID = objectHash(email_set);
    console.log(chatID)

    //check if in ddb
    // theres some weird bug here but it seems to work anyways
    var new_chat = false;
    rooms.once('value')
    .then(function(snap){
      if(snap.child(chatID).exists()){
        console.log('chatroom already exists')
        new_chat = false;
      }
      else{
        new_chat=true;
        console.log('chatroom does not exist')
      }
    })
    //its not in db
    // this will probably screw up the chat history
    if(new_chat){
      var tmp = {}
      tmp[chatID] = {}
      tmp[chatID]['members'] = {}
      tmp[chatID]['members'][nickname] = true;
      tmp[chatID]['members'][otherNickname] = true;

      rooms.update(tmp)
    }


    this.navCtrl.setRoot(ChatPage, {
          key: chatID,
          nickname: nickname,
          otherNickname: otherNickname
        });

  }
}
