import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyButtonComponent } from '../../component/my-button/my-button.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { LoadingComponent } from '../../component/loading/loading.component';
import { SubtitleComponent } from '../../component/subtitle/subtitle.component';
import { TitleComponent } from '../../component/title/title.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password-reset',
  standalone: true,
  imports: [ ReactiveFormsModule, MyButtonComponent, CommonModule, TitleComponent, SubtitleComponent, MatIconModule ],
  templateUrl: './forgot-password-reset.component.html',
  styleUrl: './forgot-password-reset.component.css'
})
export class ForgotPasswordResetComponent {
  //constructor
  constructor(private router: Router, private route: ActivatedRoute, private service: UserService, private fb: FormBuilder){}

  myPasswordForm : FormGroup = this.fb.group({
    newPassword: [''],
    repeatedPassword: [''],
  });

  user : User = {
    id: 0,
    email: '',
    password: '',
    reset_password_token: '',
    fk_role: { role: "USER" },
  }

  async onPasswordSubmit() {
    this.user.password = this.myPasswordForm.value.newPassword;
    
    let isValid = await this.checkPasswordValidity();
    if(!isValid) return;

    this.route.params.subscribe(async params => {
      let token = params['token']; 

      let response = await this.service.putPasswordToReset(this.user, token);
      this.router.navigateByUrl("/login");
    });
  }

  passwordError: string = "";
  isVisible: boolean = false;

  async checkPasswordValidity() : Promise<boolean> {
    const password = this.myPasswordForm.value.newPassword;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regex.test(password)) {
      if (password === this.myPasswordForm.value.repeatedPassword) {
        this.isVisible = false;
        return true;
      } else {
        this.passwordError = "Passwords do not match";
        this.isVisible = true;
        return false;
      }
    } else {
      this.passwordError = "Password is not valid";
      this.isVisible = true;
      return false;
    }
  }

  showPassword = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
