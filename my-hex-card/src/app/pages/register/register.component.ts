import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, MatIconModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private service: AuthService, private fb: FormBuilder){}

  myForm : FormGroup = this.fb.group({
    email: [''],
    password: [''],
    repeatPassword: ['']
  });

  showPassword = false;
  user: User = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    fk_role: { role: 'SINGLE_USER' }
  };

  onSubmit() {
    this.user.email = this.myForm.value.email;
    this.user.password = this.myForm.value.password;
    
    this.service.register(this.user);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
  }
}
