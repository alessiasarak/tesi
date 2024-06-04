import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { MyButtonComponent } from '../../component/my-button/my-button.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../component/title/title.component';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from '../../component/loading/loading.component';
import { SubtitleComponent } from '../../component/subtitle/subtitle.component';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [ ReactiveFormsModule, MyButtonComponent, CommonModule, TitleComponent, MatIconModule, LoadingComponent, SubtitleComponent ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {
  //constructor
  constructor(private router: Router, private service: UserService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.service.getUser().subscribe((data) => {
      this.assignValues(data);
      this.isLoading = false;
    });
  }

  //properties
  myProfileForm : FormGroup = this.fb.group({
    email: [''],
  });
  myPasswordForm : FormGroup = this.fb.group({
    password: [''],
    newPassword: [''],
    repeatedPassword: [''],
  });

  isLoading = true;
  user : User = {
    id: 0,
    email: '',
    password: '',
    reset_password_token: '',
    fk_role: { role: "USER" }
  }

  assignValues(user: User){
    this.myProfileForm.setValue({
      email: user.email,
    });

    console.log(this.myProfileForm);
  }

  async onProfileSubmit() {
    this.isLoading = true;
    this.user.email = this.myProfileForm.value.email;
    
    let response = await this.service.putUser(this.user);
    
    if(response) this.router.navigateByUrl("/settings");
  }

  async onPasswordSubmit() {
    this.isLoading = true;
    this.user.password = this.myPasswordForm.value.newPassword;
    
    let isValid = await this.checkPasswordValidity();
    if(!isValid) return;

    let response = await this.service.putPassword(this.user);
    if(response) this.router.navigateByUrl("/settings");
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
}
