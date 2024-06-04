import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { TitleComponent } from '../../component/title/title.component';
import { LoadingComponent } from '../../component/loading/loading.component';
import { SubtitleComponent } from '../../component/subtitle/subtitle.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, MatIconModule, ReactiveFormsModule, FormsModule, TitleComponent, SubtitleComponent, LoadingComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //constructor
  constructor(private router: Router, private service: AuthService, private fb: FormBuilder, private route: ActivatedRoute, private cardService: CardService){}

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.token = params['token']; 
    });
  }

  //properties
  myForm : FormGroup = this.fb.group({
    email: [''],
    password: [''],
    repeatPassword: ['']
  });

  showPassword = false;
  user: User = {
    id: 0,
    email: '',
    password: '',
    reset_password_token: '',
    fk_role: { role: 'USER' }
  };

  token : string = "";
  isVisible = false;
  isLoading = false;

  async onSubmit() {
    this.user.email = this.myForm.value.email;
    this.user.password = this.myForm.value.password;
    
    let isPasswordValid = await this.checkPasswordValidity();
    if(!isPasswordValid) return;

    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(this.user.email)) {
      this.passwordError = "Bisogna inserire una mail nel formato corretto (pinco@pallo.com)";
      this.isPasswordErrorVisible = true;
      return;
    }

    this.isLoading = true;
    this.route.params.subscribe(async params => {
      let token = params['token']; 
      
      this.service.register(this.user, this.token).then(async (response) =>{
        this.user = response;
        
        sessionStorage.setItem("user_id", this.user.id.toString());
        sessionStorage.setItem("role", this.user.fk_role.toString());

        if(this.user.fk_role.toString() != "ADMIN"){
          let card = await this.cardService.getCardsByUser(this.user.id.toString());
          sessionStorage.setItem('cards', JSON.stringify(card));
        } else {
          this.isVisible = true;
        }

        this.router.navigateByUrl("/card-settings/"+token);
      }).catch((error) => {
        this.isLoading = false;
        this.isVisible = true;
      });
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login(){
    this.router.navigateByUrl("/login/"+this.token);
  }

  passwordError: string = "";
  isPasswordErrorVisible: boolean = false;

  async checkPasswordValidity() : Promise<boolean> {
    const password = this.myForm.value.password;
    const regex = /^(?=.*[A-Z]).{8,}$/;       

    if (regex.test(password)) {
      if (password === this.myForm.value.repeatPassword) {
        this.isPasswordErrorVisible = false;
        return true;
      } else {
        this.passwordError = "Le password non sono uguali";
        this.isPasswordErrorVisible = true;
        return false;
      }
    } else {
      this.passwordError = "La password non è valida";
      this.isPasswordErrorVisible = true;
      return false;
    }
  }
}
