import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-button',
  standalone: true,
  imports: [ MatIconModule ],
  templateUrl: './my-button.component.html',
  styleUrl: './my-button.component.css'
})
export class MyButtonComponent {
  @Input() path = "";

  constructor(private router: Router) {}

  goBack(){
    this.router.navigateByUrl(this.path);
  }
}
