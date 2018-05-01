import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the ProfileViewerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 // requires navParams with uid and a valid uid in the db to work
 // only displays name, country, and languages (interests not in db as of 4/24 @ 5pm)

@IonicPage()
@Component({
  selector: 'page-profile-viewer',
  templateUrl: 'profile-viewer.html',
})
export class ProfileViewerPage {
  public person:any;
  prof_pic:string;
  user:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storageProvider: StorageProvider) {

      this.person = {};
      this.prof_pic = 'avatar.png';
      this.user = firebase.database().ref('/users/' + navParams.get('uid'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileViewerPage');
    this.user.once('value', snapshot => {
        this.person = snapshot.val();
        console.log(this.person);
        if(this.person.movies){
            let movies = "";
            const num_movies = Object.keys(this.person.movies).length;
            for (let i:number = 0; i < num_movies; i++){
                movies += this.person.movies[i]
                if (i < num_movies - 1){
                    movies += ', ';
                }
            }
            this.person.movies = movies;
        }
        else{
            this.person.movies = "";
        }
        if(this.person.music){
            let music = "";
            const num_music = Object.keys(this.person.music).length;
            for (let i:number = 0; i < num_music; i++){
                music += this.person.music[i]
                if (i < num_music - 1){
                    music += ', ';
                }
            }
            this.person.music = music;
        }
        else{
            this.person.music = "";
        }

        if(this.person.sports){
            let sports = "";
            const num_sports = Object.keys(this.person.sports).length;
            for (let i:number = 0; i < num_sports; i++){
                sports += this.person.sports[i]
                if (i < num_sports - 1){
                    sports += ', ';
                }
            }
            this.person.sports = sports;
        }
        else{
            this.person.sports = "";
        }

        if(this.person.languages){
            let languages = "";
            const num_languages = Object.keys(this.person.languages).length;
            for (let i:number = 0; i < num_languages; i++){
                languages += this.person.languages[i]
                if (i < num_languages - 1){
                    languages += ', ';
                }
            }
            this.person.languages = languages;
        }
        else{
            this.person.languages = "";
        }

        
        //replace avatar.png with the appropriate filename once picture uploads are complete
        this.storageProvider.getPictureURL(this.prof_pic).then(url => this.prof_pic = url);
    });
    console.log(this.person);
  }
}
