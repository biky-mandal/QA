import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fcardData: any = [
    {
      title: 'Personalized Experience',
      description: 'Tailored content, customized quizzes, and individualized feedback create a personalized learning journey for every user on our current affairs platform.',
      img: '/assets/images/f1.png',
    },
    {
      title: 'Trusted by Students',
      description: 'Students trust our platform for accurate information, reliable resources, and a supportive learning community, empowering their academic journey.',
      img: '/assets/images/f2.png',
    },
    {
      title: 'Available for everyone',
      description: 'Our platform is accessible to all, fostering inclusivity and enabling diverse learners to engage with current affairs regardless of background or location.',
      img: '/assets/images/f3.png',
    }
  ]

  constructor(
    private router: Router
  ){}

  redirects = (url: string) => {
    this.router.navigate([url]);
  }
}
