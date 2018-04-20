import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';

@Injectable()
export class StorageProvider {

  getPictureURL(relative) {

    return firebase.storage().ref(`profiles/${relative}`).getDownloadURL();
  }

  // uploadToStorage(information): AngularFireUploadTask {
  //   let newName = `${new Date().getTime()}.txt`;
  //
  //   return this.afStorage.ref(`files/${newName}`).putString(information);
  // }
  //
  // storeInfoToDatabase(metainfo) {
  //   let toSave = {
  //     created: metainfo.timeCreated,
  //     url: metainfo.downloadURLs[0],
  //     fullPath: metainfo.fullPath,
  //     contentType: metainfo.contentType
  //   }
  //   return this.db.list('files').push(toSave);
  // }
  //
  //
  // deleteFile(file) {
  //   let key = file.key;
  //   let storagePath = file.fullPath;
  //
  //   let ref = this.db.list('files');
  //
  //   ref.remove(key);
  //   return this.afStorage.ref(storagePath).delete();
  // }
}
