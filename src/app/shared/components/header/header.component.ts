import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOpen: boolean = false;
  @Output() open: EventEmitter<boolean> = new EventEmitter()
  isLoggedIn: boolean = false;
  secondHeaderRoutes: Array<string> = ['/profile']
  profileURL: any = '';

  constructor(
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.tokenValue.subscribe((value: any) => {
      this.isLoggedIn = value ? true : false;
      if(this.isLoggedIn){
        this.profileURL = localStorage.getItem('photoURL')
      }
    })
  }

  handleSidebar = () => {
    this.open.emit(true);
  }

  redirects = (to: string) => {
    console.log(to);
    this.router.navigate([to])
  }
}
