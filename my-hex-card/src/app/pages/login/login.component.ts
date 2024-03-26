import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, MatIconModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword = false;

  constructor(private router: Router) {}

  onSubmit() {
    //
    console.log("CIAO");
    this.router.navigateByUrl("/settings");
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
  }
}
