import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import { User } from "../../interfaces/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, MatIconModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //constructor
  constructor(private router: Router, private service: AuthService, private fb: FormBuilder) {}

  //properties
  showPassword = false;
  myForm : FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });
  user: User = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    fk_role: { role: 'SINGLE_USER' }
  };
  loggedUser : User | undefined = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    fk_role: { role: 'SINGLE_USER' }
  };

  //methods
  async onSubmit() {
    this.user.email = this.myForm.value.email;
    this.user.password = this.myForm.value.password;
    
    this.loggedUser = await this.service.login(this.user);

    if(this.loggedUser != undefined) {
      localStorage.setItem("user", this.loggedUser.id.toString());
      this.router.navigateByUrl("/settings");
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
  }
}
