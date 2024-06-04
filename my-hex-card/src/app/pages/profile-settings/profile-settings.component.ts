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
    let oldPassword = this.myPasswordForm.value.password;
    
    let isValid = await this.checkPasswordValidity();
    if(!isValid) {
      this.isLoading = false;
      return;
    }

    this.service.putPassword(this.user, oldPassword).then((value) => {
      this.router.navigate(['/settings']);
    }).catch((error) => {
      this.passwordError = "La vecchia password non è corretta";
      this.isVisible = true;
    });
    this.isLoading = false;
  }

  passwordError: string = "";
  isVisible: boolean = false;

  async checkPasswordValidity() : Promise<boolean> {
    if(this.myPasswordForm.value.password == ''){
      this.passwordError = "Inserire la vecchia password";
      this.isVisible = true;
      return false;
    }

    const password = this.myPasswordForm.value.newPassword;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regex.test(password)) {
      if (password === this.myPasswordForm.value.repeatedPassword) {
        this.isVisible = false;
        return true;
      } else {
        this.passwordError = "Le password devono essere uguali";
        this.isVisible = true;
        return false;
      }
    } else {
      this.passwordError = "La password non è valida";
      this.isVisible = true;
      return false;
    }
  }
}
