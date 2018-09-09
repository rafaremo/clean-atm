import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';

var config = environment.firebaseConfig;
firebase.initializeApp(config);


const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

}

export const fire = firebase;
