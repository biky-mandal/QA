import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { IUser } from '../../interfaces/User';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  isAuthor: boolean = false;
  uid: string = '';

  constructor(
    private profileService: ProfileService,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.uid = localStorage.getItem('uid') || '';

    this.profileService.fetchUserDetails(this.uid).subscribe({
      next: (res: any) => {
        this.user = res;
        this.isAuthor = this.user.type === 'author' ? true : false;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  updateUserType = (e: MatSlideToggleChange) => {
    this.isAuthor = e.checked
    console.log(this.isAuthor);

    const type = this.isAuthor ? 'author' : 'user';
    this.profileService.updateUserType(this.uid, type);
  }

  logouthandler = () => {
    this.authServ.googleLogout();
  }
}
