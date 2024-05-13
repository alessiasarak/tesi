import { Component, HostBinding } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  constructor(private router: Router, private route: ActivatedRoute, private service: AuthService, private fb: FormBuilder, private cardService: CardService) {}

  //properties
  isVisible = false;
  showPassword = false;
  myForm : FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });
  user: User = {
    id: 0,
    email: '',
    password: '',
    fk_role: { role: 'USER' }
  };
  loggedUser : User | undefined = {
    id: 0,
    email: '',
    password: '',
    fk_role: { role: 'USER' }
  };

  //methods
  async onSubmit() {
    this.user.email = this.myForm.value.email;
    this.user.password = this.myForm.value.password;

    this.route.params.subscribe(async params => {
      let token = params['token']; 

      this.service.login(this.user, token).then(async (response) => {  
        this.loggedUser = response;
        if(this.loggedUser != undefined) {
          localStorage.setItem("user_id", this.loggedUser.id.toString());
          localStorage.setItem("role", this.loggedUser.fk_role.toString());
    
          if(this.loggedUser.fk_role.toString() != "ADMIN"){
            let card = await this.cardService.getCardsByUser(this.loggedUser.id.toString());
            localStorage.setItem('cards', JSON.stringify(card));
          }else {
            this.isVisible = true;
          }
    
          if(token) this.router.navigateByUrl("/card-settings/"+token);
          this.router.navigateByUrl("/settings");
        }
      }).catch((error) => {
        this.isVisible = true;
      });
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  forgotPassword(){
    this.router.navigateByUrl("/forgot-password");
  }

  closeError() {
    this.isVisible = false;
  }
}
