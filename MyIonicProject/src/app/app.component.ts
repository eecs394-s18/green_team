

import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { RoomPage } from '../pages/room/room';
import { AddRoomPage } from '../pages/add-room/add-room';
import { ChatPage } from '../pages/chat/chat';
import { ProfilesPage } from '../pages/profiles/profiles';
import { ProfilePage } from '../pages/profile/profile';
import { AuthPage } from '../pages/auth/auth';

import { AuthProvider } from '../providers/auth/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'Firebase';
import { environment } from '../environments/environment';


//const config = {
 // apiKey: 'AIzaSyBoiRxz06EnLnoXJQIwpYPy9XKQ9ymwcdQ',
 // authDomain: 'commonculture-f0aa6.firebaseapp.com',
 // databaseURL: 'https://commonculture-f0aa6.firebaseio.com',
 // projectId: 'commonculture-f0aa6',
 // storageBucket: 'commonculture-f0aa6.appspot.com',
 // messagingSenderId: '377375303339'
//};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = AuthPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    //firebase.initializeApp(config);

    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Profiles', component: ProfilesPage },
      { title: 'Authentication', component: AuthPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
