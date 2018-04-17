import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import {
   FormBuilder,
   FormGroup,
   Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { ChatsPage } from '../chats/chats';
import { NewuserPage } from '../newuser/newuser';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

   /**
    * Create reference for FormGroup object
    */
   public form: FormGroup;
   public data = { email: "", password: "" }


   constructor(public navCtrl: NavController,
               private _FB: FormBuilder,
               private _AUTH: AuthProvider,
               public loadingCtrl: LoadingController)
   {
      // Define FormGroup object using Angular's FormBuilder
      this.form = this._FB.group({
         'email': ['', Validators.required],
         'password': ['', Validators.required]
      });
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

   createAccount() {
     this.navCtrl.setRoot(NewuserPage);
   }

   /**
    * Log in using the loginWithEmailAndPassword method
    * from the AuthProvider service (supplying the email
    * and password FormControls from the template via the
    * FormBuilder object
    * @method logIn
    * @return {none}
    */
   logIn(): void {

    let email: any = this.form.controls['email'].value,
    password: any = this.form.controls['password'].value;

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    if (this.data.password != "" && this.validateEmail(this.data.email)) {
      this._AUTH.loginWithEmailAndPassword(this.data.email, this.data.password)
      .then((auth: any) => {
        loading.dismiss();
        this.navCtrl.setRoot(ChatsPage);
      })
      .catch((error: any) => {
        loading.dismiss();
        this.presentText(error.message);
        console.log(error.message);
      });
    } else {
      loading.dismiss();
      this.presentText('Invalid inputs. Please try again.');
    }
  }
}
