import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  standalone: true,
  imports: [],
  templateUrl: './secondary-button.component.html',
  styleUrl: './secondary-button.component.css'
})
export class SecondaryButtonComponent {
  @Input() text : string = "";
  @Output() action: EventEmitter<any> = new EventEmitter();

  buttonWasClicked() : void {
    this.action.emit();
  }
}
