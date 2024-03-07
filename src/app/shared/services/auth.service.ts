import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, User, user, signOut } from '@angular/fire/auth';
import { Firestore, collection, collectionData, setDoc, doc, docData, DocumentReference, CollectionReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/User';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
  ) { }

  user$ = user(this.auth);
  uid: any = localStorage.getItem('uid');
  usersCollection: CollectionReference = collection(this.firestore, 'users');

  tokenValue = new BehaviorSubject(this.token);

  set token(value: any) {
    this.tokenValue.next(value);
    localStorage.setItem('accessToken', value);
  }

  get token() {
    return localStorage.getItem('accessToken');
  }


  googleLogout = () => {
    signOut(this.auth).then((res: any) => {
      this.token = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('photoURL');
      localStorage.removeItem('uid');
      this.router.navigate(['/login'])
    })
  }

  googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        const user: any = result.user;
        // localStorage.setItem('accessToken', user.accessToken);
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('photoURL', user.photoURL);
        this.token = user.accessToken;
        this.verifyAndCreateUser(user);
        this.router.navigate(['/'])
      }).catch((error) => {
        const errorCode: any = error.code;
        const errorMessage: any = error.message;
        const email: any = error.customData.email;
      });
  }


  verifyAndCreateUser = (user: any) => {
    // Get the doc with uid. If already exist don't need to create again
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    docData(userDocRef).subscribe((d: any) => {
      if (!d) {
        // Creating a user document with uid
        let payload: IUser = this.createPayload(user);
        setDoc(doc(this.usersCollection, payload.uid), payload);
      }
    })
  }

  createPayload = (user: any) => {
    let obj: IUser = {
      uid: user.uid,
      slug: user.uid,
      type: 'user',
      name: user.displayName,
      phone: user.phoneNumber,
      email: user.email,
      email_verified: user.emailVerified,
      photoURL: user.photoURL,
      last_login: moment(user.metadata.lastSignInTime).utc().format(),
      created_on: moment().utc().format(),
      updated_on: moment().utc().format()
    }

    return obj;
  }

}
