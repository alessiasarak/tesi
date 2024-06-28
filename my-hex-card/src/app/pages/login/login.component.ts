import { Component, HostBinding } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import { User } from "../../interfaces/user";
import { CardService } from "../../services/card.service";
import { TitleComponent } from "../../component/title/title.component";
import { HeaderComponent } from "../../component/header/header.component";
import { LoadingComponent } from "../../component/loading/loading.component";
import { SubtitleComponent } from "../../component/subtitle/subtitle.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, SubtitleComponent, MatIconModule, ReactiveFormsModule, TitleComponent, HeaderComponent, LoadingComponent ],
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
    reset_password_token: '',
    fk_role: { role: 'USER' }
  };
  loggedUser : User | undefined = {
    id: 0,
    email: '',
    password: '',
    reset_password_token: '',
    fk_role: { role: 'USER' }
  };

  token : string | undefined;
  isLoading = false;

  ngOnInit(){
    this.route.params.subscribe(async params => {
      this.token = params['token']; 
    });
  }

  //methods
  async onSubmit() {
    this.isLoading = true;
    this.user.email = this.myForm.value.email;
    this.user.password = this.myForm.value.password;

    this.service.login(this.user, this.token).then(async (response) => {  
      this.loggedUser = response;
      
      if(this.loggedUser != undefined) {
        sessionStorage.setItem("user_id", this.loggedUser.id.toString());
        sessionStorage.setItem("role", this.loggedUser.fk_role.toString());
  
        if(this.loggedUser.fk_role.toString() != "ADMIN"){
          // let card = await this.cardService.getCardsByUser(this.loggedUser.id.toString());
          // sessionStorage.setItem('cards', JSON.stringify(card));
        } else {
          this.isVisible = true;
        }
  
        if(this.token) this.router.navigateByUrl("/card-settings/"+this.token);
        else this.router.navigateByUrl("/settings");
      }
    }).catch((error) => {
      this.isLoading = false;
      this.isVisible = true;
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  forgotPassword(){
    this.router.navigateByUrl("/forgot-password");
  }

  register(){
    this.router.navigateByUrl("/register/"+this.token);
  }
}
