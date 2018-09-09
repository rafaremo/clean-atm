import { Component, OnInit } from '@angular/core';

import { WindowRefService } from '../../services/window-ref.service';
import { PhoneNumber } from '../../models/PhoneNumber';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    WindowRefService
  ]
})
export class LoginComponent implements OnInit {

  windowRef: any;

  phoneNumber = new PhoneNumber();

  verificationCode: string;

  user: any;

  constructor(private win: WindowRefService, private router: Router) {
  }

  ngOnInit() {
    firebase.auth().useDeviceLanguage();
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha')
    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    console.log(num, appVerifier);

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    console.log(result.user);
                    this.user = result.user;
                    localStorage.setItem('bbvaUser', result.user.uid);

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }

  logOut() {
    localStorage.removeItem('bbvaUser');
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }


}
