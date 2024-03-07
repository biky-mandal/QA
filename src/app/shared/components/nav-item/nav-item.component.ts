import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {

  @Input() navItem: any = {};
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.tokenValue.subscribe((value: any) => {
      this.isLoggedIn = value ? true : false;
    })
  }

  redirectsTo = (title: string, route: string) => {
    if (route) {
      this.router.navigate([route]);
    } else {
      // Logout Pressed
      if (title === 'Logout') {
        this.authService.googleLogout();
      }
    }
  }

}
