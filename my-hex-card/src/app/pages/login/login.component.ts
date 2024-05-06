import { Component, HostBinding } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import { User } from "../../interfaces/user";
import { CardService } from "../../services/card.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, MatIconModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //constructor
  constructor(private router: Router, private service: AuthService, private fb: FormBuilder, private cardService: CardService) {}

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
      localStorage.setItem("user_id", this.loggedUser.id.toString());
      localStorage.setItem("role", this.loggedUser.fk_role.toString());

      //setting in the locale storage all the card of the user logged
      let card = await this.cardService.getCardByUser(this.loggedUser.id.toString());
      localStorage.setItem('card', JSON.stringify(card.id));

      this.router.navigateByUrl("/settings");
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  forgotPassword(){
    this.router.navigateByUrl("/forgot-password");
  }
}
