import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-plus-button',
  standalone: true,
  imports: [ MatIconModule ],
  templateUrl: './plus-button.component.html',
  styleUrl: './plus-button.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PlusButtonComponent {
  @Output() action: EventEmitter<any> = new EventEmitter();

  buttonWasClicked() : void {
    console.log('Button was clicked');
    this.action.emit();
  }
}
