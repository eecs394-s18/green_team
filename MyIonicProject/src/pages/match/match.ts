import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
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

  chatUser(user): void {
 
    const rooms = firebase.database().ref('chatrooms');
    const currUser = firebase.auth().currentUser;
    const email_set = new Set([currUser.email,user.email])
    var key = '', nickname = currUser.displayName, otherNickname = user.username, roomFound = false;
    const chatID = objectHash(email_set);
    console.log(user,currUser)

    // assume its not in db
    var tmp = {}
    tmp[chatID] = {}
    tmp[chatID]['members'] = {}
    tmp[chatID]['members'][nickname] = true;
    tmp[chatID]['members'][otherNickname] = true;

    rooms.update(tmp)

    this.navCtrl.setRoot(ChatPage, {
          key: chatID,
          nickname: nickname,
          otherNickname: otherNickname
        });
    /*
    rooms.once('value', snapshot => {
      // Join existing room - check for existing room
      // If not existing, then make a new one
      for (var room_key in snapshot.val()) {
        let members = snapshot.val()[room_key]['members'];

        var count = 0;
        for (var username in members) {
          if (username == currUser.displayName || username == user.username) {
            count++;
            delete members[username];
          }
        }

        if (count == 2) {
          roomFound = true;
          key = room_key;
          break;
        }
      }

      if (!roomFound) {
        // Create new room
        var data = { members: {} };
        data['members'][currUser.displayName] = true
        data['members'][user.username] = true

        var newref = rooms.push(data);

        key = newref.key;
        roomFound = true;
      }

      nickname = currUser.displayName;
      otherNickname = user.username;

      if (roomFound) {
        console.log(key)
        console.log(nickname)
        console.log(otherNickname)
        this.navCtrl.setRoot(ChatPage, {
          key: key,
          nickname: nickname,
          otherNickname: otherNickname
        });
      } else {
        console.log('could not join room - something went wrong')
      }
    })
    */
  }
}
