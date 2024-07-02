import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { TitleComponent } from '../../component/title/title.component';
import { SubtitleComponent } from '../../component/subtitle/subtitle.component';
import { SecondaryButtonComponent } from '../../component/secondary-button/secondary-button.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ CommonModule, SubtitleComponent,MatIconModule, ReactiveFormsModule, TitleComponent, SecondaryButtonComponent ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  //constructor
  constructor(private router: Router, private service: UserService, private fb: FormBuilder){}

  //properties
  myProfileForm : FormGroup = this.fb.group({
    email: [''],
  });
  
  user : User = {
    id: 0,
    email: '',
    password: '',
    reset_password_token: '',
    fk_role: { role: "USER" }
  }

  async onProfileSubmit() {
    this.user.email = this.myProfileForm.value.email;
    
    let response = await this.service.sendEmailToResetPassword(this.user); 
    if(response) this.router.navigateByUrl("/email-send");
  }
}
