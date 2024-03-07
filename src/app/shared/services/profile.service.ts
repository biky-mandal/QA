import { Injectable } from '@angular/core';
import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private firestore: Firestore,
  ) { }

  fetchUserDetails = (uid: string) => {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return docData(userDocRef);
  }

  updateUserType = (uid: string, type: string) => {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return updateDoc(userDocRef, {type: type});
  }

}
