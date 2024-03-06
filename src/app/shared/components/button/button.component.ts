import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() color: string = 'red';
  @Output() onClick = new EventEmitter<boolean>();

  onClickEventHandler = () => {
    this.onClick.emit();
  }
}
