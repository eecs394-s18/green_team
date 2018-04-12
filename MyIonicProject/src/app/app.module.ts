import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SigninPage } from '../pages/signin/signin';
import { RoomPage } from '../pages/room/room';
import { AddRoomPage } from '../pages/add-room/add-room';
import { ChatPage } from '../pages/chat/chat';
import { AuthPage } from '../pages/auth/auth';
import { ProfilesPage } from '../pages/profiles/profiles';
import { ProfilePage } from '../pages/profile/profile';
import { MatchPage } from '../pages/match/match';
import { ChatsPage } from '../pages/chats/chats';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';


import * as firebase from 'firebase';

import { AuthProvider } from '../providers/auth/auth';
import { environment } from '../environments/environment';

firebase.initializeApp(environment.firebase);

//const config = {
 // apiKey: 'AIzaSyBoiRxz06EnLnoXJQIwpYPy9XKQ9ymwcdQ',
  //authDomain: 'commonculture-f0aa6.firebaseapp.com',
 // databaseURL: 'https://commonculture-f0aa6.firebaseio.com',
 // projectId: 'commonculture-f0aa6',
 // storageBucket: 'commonculture-f0aa6.appspot.com',
 // messagingSenderId: '377375303339'
//};


@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    RoomPage,
    AddRoomPage,
    ChatPage,
    ProfilesPage,
    ProfilePage,
    MatchPage,
    AuthPage,
    ChatsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    //AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    RoomPage,
    AddRoomPage,
    ChatPage,
    ProfilesPage,
    ProfilePage,
    MatchPage,
    AuthPage,
    ChatsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
