import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { MatchPage } from '../match/match'
import { ChatsPage } from '../chats/chats'
import { ProfileViewerPage } from '../profile-viewer/profile-viewer';
import * as firebase from 'Firebase';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})


export class ChatPage {

  @ViewChild(Content) content: Content;

  data = { type:'', nickname:'', message:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  otherNickname:string;
  matches:boolean;
  offStatus:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.otherNickname = this.navParams.get("otherNickname") as string;
    this.matches = this.navParams.get("matches") as boolean;
    this.data.type = 'message';
    this.data.nickname = this.nickname;

    // Create completely new chat
    //let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    /*
    joinData.set({
      type:'join',
      user:this.nickname,
      message:this.nickname+' has joined this room.',
      sendDate:Date()
    });
    this.data.message = '';
    */
    firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if(this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  ionViewDidLoad() {
    //provide chat suggestions if no chats have been sent
    if (this.chats.length != 0) {
      let prompts = document.getElementById("prompts");
      prompts.style.display = "none";
    }
  }

  sendprompt(m) {
    document.getElementsByClassName("prompt");
    this.sendMessage(m);
  }

  sendMessage(prompt) {
   	let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    if (prompt) {
      newData.set({
      type:this.data.type,
      user:this.data.nickname,
      message:prompt,
      sendDate:Date(),
      unix_ts: (new Date()).getTime() / 1000
     });
    } else if (this.data.message != ''){
      newData.set({
      type:this.data.type,
      user:this.data.nickname,
      message:this.data.message,
      sendDate:Date(),
      unix_ts: (new Date()).getTime() / 1000
     });
    }
  	
    this.data.message = '';
	}

  // This runs before ionViewDidLeave()
	exitChat() {
        if (this.matches) {
          this.navCtrl.setRoot(MatchPage);
        } else {
          this.navCtrl.setRoot(ChatsPage);
        }
	}

    pushProfile() {
        const currentUserId = firebase.auth().currentUser.uid;
        var otherUserId = undefined;
        const members = firebase.database().ref('chatrooms/'+this.roomkey+'/members');
        members.once('value', snapshot => {
            const mems = snapshot.val();
            let uids = Object.keys(mems);
            if (uids[0] === currentUserId){
                otherUserId = uids[1];
            }
            else{
                otherUserId = uids[0];
            }
            this.navCtrl.push(ProfileViewerPage, {uid: otherUserId});
        });
    }




  ionViewDidLeave() {
      /*
    let exitData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
	  exitData.set({
	    type:'exit',
	    user:this.nickname,
	    message:this.nickname+' has exited this room.',
	    sendDate:Date()
	  });
      */

	  this.offStatus = true;
  }

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
