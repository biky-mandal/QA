import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-layout',
  templateUrl: './author-layout.component.html',
  styleUrls: ['./author-layout.component.css']
})
export class AuthorLayoutComponent implements OnInit{
  navItems: any = [
    {
      icon: 'dashboard',
      title: 'Dashboard',
      route: '/author/dashboard',
    },
    {
      icon: 'quiz',
      title: 'My Questions',
      route: '/author/my-questions',
    },
    {
      icon: 'add_circle',
      title: 'Create New Question',
      route: '/author/create-question',
    },
    {
      icon: 'category',
      title: 'Categories',
      route: '/author/categories',
    }
  ];

  position: 'SIDE' | 'BOTTOM' = 'SIDE';

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    // Default Route
    this.router.navigate(['/author/dashboard']);

    this.position = window.innerWidth <= 820 ? 'BOTTOM' : 'SIDE';
  }
}
