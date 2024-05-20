import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, MatIconModule, ReactiveFormsModule ],
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
    fk_role: { role: 'USER' }
  };

  token : string = "";
  isVisible = false;

  async onSubmit() {
    this.user.email = this.myForm.value.email;
    this.user.password = this.myForm.value.password;
    
    let isPasswordValid = await this.checkPasswordValidity();
    if(!isPasswordValid) return;

    this.route.params.subscribe(async params => {
      let token = params['token']; 
      
      this.service.register(this.user, this.token).then(async (response) =>{
        this.user = response;
        
        localStorage.setItem("user_id", this.user.id.toString());
        localStorage.setItem("role", this.user.fk_role.toString());

        if(this.user.fk_role.toString() != "ADMIN"){
          let card = await this.cardService.getCardsByUser(this.user.id.toString());
          localStorage.setItem('cards', JSON.stringify(card));
        } else {
          this.isVisible = true;
        }

        this.router.navigateByUrl("/card-settings/"+token);
      }).catch((error) => {
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
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;    

    if (regex.test(password)) {
      if (password === this.myForm.value.repeatPassword) {
        this.isPasswordErrorVisible = false;
        return true;
      } else {
        this.passwordError = "Passwords do not match";
        this.isPasswordErrorVisible = true;
        return false;
      }
    } else {
      this.passwordError = "Password is not valid";
      this.isPasswordErrorVisible = true;
      return false;
    }
  }
}
