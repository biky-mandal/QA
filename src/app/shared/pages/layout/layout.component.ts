import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  isOpen: boolean = false;
  navOpen($event: any): void {
    // toggle condition here
    this.isOpen = !this.isOpen;
    console.log('$navOpen');
  }
}
