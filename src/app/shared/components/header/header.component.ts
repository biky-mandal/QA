import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    this.isLoggedIn = token ? true : false;
  }

  handleSidebar = () => {
    this.open.emit(true);
  }

  redirects = (to: string) => {
    console.log(to);
    this.router.navigate([to])
  }
}
