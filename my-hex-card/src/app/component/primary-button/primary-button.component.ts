import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.css'
})
export class PrimaryButtonComponent {
  @Input() text : string = "";
  @Output() action: EventEmitter<any> = new EventEmitter();

  buttonWasClicked() : void {
    this.action.emit();
  }
}
