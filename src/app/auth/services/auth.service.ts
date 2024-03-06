import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, User, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  user$ = user(this.auth);

  googleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        const user: any = result.user;
        localStorage.setItem('accessToken', user.accessToken);
        localStorage.setItem('uid', user.uid);
        this.router.navigate(['/'])
      }).catch((error) => {
        const errorCode: any = error.code;
        const errorMessage: any = error.message;
        const email: any = error.customData.email;
      });
  }
}
