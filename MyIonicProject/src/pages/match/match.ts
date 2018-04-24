import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
  private userRooms;
  currentUser: any;
  public person: {username: string, email: string, country: string, languages: string};
  public filters: {username: string, email: string, country: string, languages: string}

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.allUsers = {};
    this.chosenUsers = [];
    this.currentUser = firebase.auth().currentUser;
    this.userRooms = {};
    this.filters = {username: undefined, email: undefined, country: undefined, languages: undefined};

    //this.currentUser = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
    //console.log(this.currentUser)
  }

  ionViewDidLoad() {
    console.log('loading match.ts')
    this.loading = this.loadingCtrl.create({
      content: 'Getting matches...'
    });
    this.loading.present();

    if (this.currentUser == null) {
      this.loading.dismiss();
      this.presentText('You are not signed in. Please sign in and try again.')
      return
    }

    const ref = firebase.database().ref('users');
    const users = ref.once('value', snapshot => {
      this.allUsers = snapshot.val();

      // Get chatrooms of current user for filtering
      ref.child(this.currentUser.uid+'/rooms/').once('value', snapshot => {
        this.userRooms = snapshot.val();
        if (this.userRooms == null) this.userRooms = {};
        // this.selectUsers();
        this.loading.dismiss();
      })
    });

    firebase.database().ref('/users/' + this.currentUser.uid).once('value', snapshot => {
        const userData = snapshot.val();
        if (userData) {
          this.person = userData;
        }
    });



    // test query
    // var query = {
    //   countries:[],
    //   languages:[]
    // }
    // this.findMatchingUsers(query);
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

  presentText2(text) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: text
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }

  selectUsers(query) {
    // TODO: Algorithm for matching users goes here.
    this.chosenUsers = []
    let keys:string[] = Object.keys(this.allUsers);
    for (let i:number = 0; i < keys.length; i++) {
      if (this.currentUser.displayName == this.allUsers[keys[i]]['username']) {
        continue;
      }

      let obj = this.allUsers[keys[i]];
      obj['id'] = keys[i];

      // Check if the room already exists
      if (this.userRooms.hasOwnProperty(keys[i])) continue;

      // filter options shown
      if (query == null) {
        if (this.allUsers[keys[i]]['international'] != this.allUsers[this.currentUser.uid]['international']) {
          this.chosenUsers.push(obj);
        }
      }
      else {
        if ((this.allUsers[keys[i]]['country'] == query['country']) && (this.allUsers[keys[i]]['languages'].includes(query['languages'])) &&
         this.allUsers[keys[i]]['international'] != this.allUsers[this.currentUser.uid]['international']) {
          this.chosenUsers.push(obj);
        }
      }

    }
    this.presentText2("Success!")
    this.loading.dismiss();
  }

  chatUser(user): void {

    const rooms = firebase.database().ref('chatrooms');
    //const currUser = firebase.auth().currentUser;
    const email_set = new Set([this.person.email, user.email]);
    var nickname = this.person.username, otherNickname = user.username;
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
        tmp[chatID]['members'][this.currentUser.uid] = true;
        tmp[chatID]['members'][user.id] = true;

        console.log('outside: ', this);

        rooms.update(tmp).then(res => {
          console.log('inside: ', this);

          // Add to current user and other user's info
          let users = firebase.database().ref('users')
          users.child(this.currentUser.uid + '/rooms/' + user.id).set(true)
          users.child(user.id + '/rooms/' + this.currentUser.uid).set(true)

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

  searchMatches() {
    // get the information of how user wants to filter
    this.filters = {username: this.filters.username, email: this.filters.email, country: this.filters.country, languages: this.filters.languages}
    this.selectUsers(this.filters)
  }

  showAll() {
    this.selectUsers(null);
  }
}
