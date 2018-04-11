import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {
   FormBuilder,
   FormGroup,
   Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { ProfilePage } from '../profile/profile';

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


   constructor(public navCtrl: NavController,
               private _FB: FormBuilder,
               private _AUTH: AuthProvider)
   {
      // Define FormGroup object using Angular's FormBuilder
      this.form = this._FB.group({
         'email': ['', Validators.required],
         'password': ['', Validators.required]
      });
   }

   /**
    * Log in using the loginWithEmailAndPassword method
    * from the AuthProvider service (supplying the email
    * and password FormControls from the template via the
    * FormBuilder object
    * @method logIn
    * @return {none}
    */
   logIn(): void
   {
      let email: any = this.form.controls['email'].value,
          password: any = this.form.controls['password'].value;

      this._AUTH.loginWithEmailAndPassword(email, password)
      .then((auth: any) =>
      {
         this.navCtrl.setRoot(ProfilePage);
      })
      .catch((error: any) =>
      {
         console.log(error.message);
      });
   }

}