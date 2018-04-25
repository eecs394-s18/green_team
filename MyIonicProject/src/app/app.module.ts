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
import { NewuserPage } from '../pages/newuser/newuser';
import { ProfileViewerPage } from '../pages/profile-viewer/profile-viewer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FirebaseProvider } from './../providers/firebase/firebase';

import { ImagePicker } from '@ionic-native/image-picker';

import * as firebase from 'firebase';

import { AuthProvider } from '../providers/auth/auth';
import { StorageProvider } from '../providers/storage/storage';
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
    ChatsPage,
    NewuserPage,
    ProfileViewerPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
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
    ChatsPage,
    NewuserPage,
    ProfileViewerPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    StorageProvider,
    ImagePicker
  ]
})
export class AppModule {}
