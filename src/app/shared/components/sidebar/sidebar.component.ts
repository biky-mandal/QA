import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnChanges{
  @Input() openNav = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.openNav);
  }


}
