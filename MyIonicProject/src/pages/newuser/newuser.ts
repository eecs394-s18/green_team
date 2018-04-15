import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import {
   FormBuilder,
   FormGroup,
   Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { ProfilePage } from '../profile/profile'
/**
 * Generated class for the NewuserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newuser',
  templateUrl: 'newuser.html',
})
export class NewuserPage {

  public form: FormGroup;
  public data = { email: "", password: "", r_password: "" }

  constructor(public navCtrl: NavController,
              private _FB: FormBuilder,
              private _AUTH: AuthProvider,
              public loadingCtrl: LoadingController)
      {
      this.form = this._FB.group({
         'email': ['', Validators.required],
         'password': ['', Validators.required],
         'r_password': ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewuserPage');
  }




  validateEmail(email): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  presentText(text) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: text
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  createUser(): void {
      let email: any = this.form.controls['email'].value;
      let password: any = this.form.controls['password'].value;
      let r_password: any = this.form.controls['r_password'].value

      let loading = this.loadingCtrl.create({content: 'Loading...'});

      loading.present();

      if (this.data.password && this.data.password === this.data.r_password && this.validateEmail(this.data.email)){
          this._AUTH.createUserWithEmailAndPassword(this.data.email, this.data.password)
          .then((auth: any) => {
              loading.dismiss();
              this.navCtrl.setRoot(ProfilePage);
          })
      .catch((error: any) => {
          loading.dismiss();
          this.presentText(error.message);
          console.log(error.message);
      });
  } else {
      loading.dismiss();
      this.presentText('Invalid inputs');
  }
  }
}
