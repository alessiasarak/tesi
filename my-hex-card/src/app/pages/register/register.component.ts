import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, MatIconModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  showPassword = false;

  onSubmit() {
    //
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
  }
}
