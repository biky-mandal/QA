import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnChanges{
  @Input() openNav = false;

  navItems: any = [
    {
      icon: 'home',
      title: 'Home',
      route: '/',
      guard: false
    },
    {
      icon: 'person',
      title: 'Profile',
      route: '/profile',
      guard: true
    },
    {
      icon: 'dashboard',
      title: 'Dashboard',
      route: '/dashboard',
      guard: true
    },
    {
      icon: 'contacts_product',
      title: 'Contact',
      route: '/contact',
      guard: false
    },
    {
      icon: 'info',
      title: 'About',
      route: '/about',
      guard: false
    },
    {
      icon: 'logout',
      title: 'Logout',
      route: null,
      guard: true
    }
  ]

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.openNav);
  }


}
