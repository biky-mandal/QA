import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fcardData: any = [
    {
      title: 'Personalized Experience',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      img: '/assets/images/f1.png',
    },
    {
      title: 'Trusted by Students',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      img: '/assets/images/f2.png',
    },
    {
      title: 'Available for everyone',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      img: '/assets/images/f3.png',
    }
  ]
}
