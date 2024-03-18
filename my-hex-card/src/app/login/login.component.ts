import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, MatIconModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword = false;

  onSubmit() {
    //
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
  }
}
