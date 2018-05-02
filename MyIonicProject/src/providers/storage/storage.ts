import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';

@Injectable()
export class StorageProvider {

  getPictureURL(relative) {

    return firebase.storage().ref(`profiles/${relative}`).getDownloadURL();
  }
}
